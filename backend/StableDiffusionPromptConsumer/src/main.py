import boto3

from time import sleep
import os

from PIL import Image
from io import BytesIO

import torch
from torch import autocast
from diffusers import StableDiffusionPipeline

from json import loads

def generate_image(prompt: str):
    """Generate images from prompt"""
    device = get_device()

    pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", use_auth_token=True)
    pipe = pipe.to(device)

    # First-time "warmup" pass (see explanation above)
    if device == 'mps':
        _ = pipe(prompt, num_inference_steps=1)

    # Results match those from the CPU device after the warmup pass.
    return pipe(prompt).images[0]


def save_image(image, filename):
    image.save(filename)


def get_device():
    if(torch.cuda.is_available()):
        return 'cuda'
    elif(torch.backends.mps.is_available()):
        return 'mps'
    else:
        return 'cpu'

def save_image_to_s3(image: Image, prompt: str):
    buffer = BytesIO()
    image.save(buffer, "PNG")
    buffer.seek(0)
    client = boto3.client("s3")
    client.put_object(Bucket='minerva-images', Body=buffer, Key='v1/' + prompt + '/0.png')
    print(f"Image saved to S3 for prompt: {prompt}")

def process_message(message):
    json = loads(message.body)
    print(f"processing message: {json}")
    prompt = json["prompt"].replace("-", " ")
    image = generate_image(prompt)
    save_image_to_s3(image, json["prompt"])
    print(f"Image generated for prompt: {prompt}")
    message.delete()


def main():
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
            process_message(message )
            message.delete()
        sleep(1)

if __name__ == "__main__":
    main()
