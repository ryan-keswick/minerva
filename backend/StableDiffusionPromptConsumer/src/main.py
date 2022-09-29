import boto3

from time import sleep
import os

from PIL import Image
from io import BytesIO

import torch
from torch import autocast
from diffusers import StableDiffusionPipeline

from json import loads


def generate_image(prompt: str, warmup: bool) -> Image:
    """Generate images from prompt"""
    device = get_device()

    pipe = StableDiffusionPipeline.from_pretrained(
        "CompVis/stable-diffusion-v1-4",
        use_auth_token=os.getenv("HUGGING_FACE_CLI_TOKEN"),
    )
    pipe = pipe.to(device)
    pipe.safety_checker = lambda images, **kwargs: (images, False)

    # First-time "warmup" pass (see explanation above)
    if device == "mps" and warmup:
        warmup = False
        _ = pipe(prompt, num_inference_steps=1)

    # Results match those from the CPU device after the warmup pass.
    return pipe(
        prompt,
        height=384,  # Has to be multiple of 8
        width=384,  # Has to be multiple of 8
    ).images[0]


def save_image(image, filename):
    image.save(filename)


def get_device():
    if torch.cuda.is_available():
        return "cuda"
    elif torch.backends.mps.is_available():
        return "mps"
    else:
        return "cpu"


def save_image_to_s3(image: Image, prompt: str):
    buffer = BytesIO()
    image.save(buffer, "PNG")
    buffer.seek(0)
    client = boto3.client("s3")
    client.put_object(
        Bucket="minerva-images", Body=buffer, Key="v1/" + prompt + "/0.png"
    )
    print(f"Image saved to S3 for prompt: {prompt}")


def image_exists(prompt):
    client = boto3.client("s3")
    try:
        client.head_object(Bucket="minerva-images", Key="v1/" + prompt + "/0.png")
        return True
    except:
        return False


def process_message(message):
    json = loads(message.body)
    print(f"processing message: {json}")
    if not image_exists(json["prompt"]):
        prompt = json["prompt"].replace("-", " ")
        image = generate_image(prompt, warmup=False)
        save_image_to_s3(image, json["prompt"])
        print(f"Image generated for prompt: {prompt}")
    print("Message processed")


def main():
    print(f"Running on '{get_device()}' device")
    generate_image("a dog on a beach at sunset", warmup=True)
    launch_consumer()


def launch_consumer():
    sqs = boto3.resource(
        "sqs",
        region_name="us-east-1",
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    )
    queue = sqs.get_queue_by_name(QueueName="minerva-sqs")

    while True:
        messages = queue.receive_messages()
        for message in messages:
            process_message(message)
            message.delete()
        sleep(1)


if __name__ == "__main__":
    main()
