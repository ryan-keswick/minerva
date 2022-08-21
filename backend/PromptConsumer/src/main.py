import boto3
import os

# from dalle_model import DalleModel
# async def generate_images(prompt: str):
#     """Generate images from prompt"""
#     num_images = 9
#     generated_imgs = dalle_model.generate_images(prompt, num_images)

#     returned_generated_images = []

#     for idx, img in enumerate(generated_imgs):
#         pass


def process_message(sqs_message: str):
    print(f"processing message: {sqs_message}")


if __name__ == "__main__":
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
            process_message(message.body)
            message.delete()
