#

from json import loads
from os import environ
from time import sleep

import torch
from diffusers import StableDiffusionPipeline
import PIL

from services.logging_service import LoggingService
from services.s3_service import S3Service
from services.sqs_service import SQSService


class StableDiffusionConsumer:
    def __init__(self):
        self.logging_service = LoggingService()
        self.s3_service = S3Service(self.logging_service, environ["S3_BUCKET_NAME"])
        self.sqs_service = SQSService(self.logging_service, environ["QUEUE_NAME"])

        self.device = self.__get_device()
        self.logging_service.log(f"Using device: {self.device}")
        self.pipe = StableDiffusionPipeline.from_pretrained(
            "CompVis/stable-diffusion-v1-4",
            use_auth_token=environ["HUGGING_FACE_CLI_TOKEN"],
        )
        self.pipe = self.pipe.to(self.device)
        self.pipe.safety_checker = lambda images, **kwargs: (images, False)

        self.__warmup()
        self.launch_consumer()

    def __warmup(self):
        if self.device == "mps":
            self.logging_service.log("Warming up MPS")
            _ = self.pipe("A golden retriever on a beach", num_inference_steps=1)

    def __get_device(self) -> str:
        """Returns the device to use for inference

        Returns:
            str: [cuda|mps|cpu]
        """
        if torch.cuda.is_available():
            return "cuda"
        elif torch.backends.mps.is_available():
            return "mps"
        else:
            return "cpu"

    def __generate_image(self, prompt: str, height=512, width=512) -> PIL.Image:
        """Generates an image from a prompt

        Args:
            prompt (str): The prompt to use
            height (int, optional): The height of the image. Defaults to 512.
            width (int, optional): The width of the image. Defaults to 512.

        Returns:
            Image (PIL Image): The generated image
        """
        return self.pipe(prompt, height=height, width=width).images[0]

    def launch_consumer(self) -> None:
        """Launches the consumer"""
        while True:
            messages = self.sqs_service.get_messages()
            for message in messages:
                message_body = loads(message.body)
                prompt = message_body["prompt"]
                key = message_body["key"]
                if not self.s3_service.does_image_exist(key):
                    image = self.__generate_image(prompt)
                    self.s3_service.save_image_to_s3(image, key)
                message.delete()
            sleep(3)


if __name__ == "__main__":
    StableDiffusionConsumer()
