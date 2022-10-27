#

from os import environ
import boto3

from .logging_service import LoggingService


class SQSService:
    def __init__(self, logging_service: LoggingService, queue_name: str):
        self.logging_service = logging_service
        self.queue = boto3.resource(
            "sqs",
            region_name="us-east-1",
            aws_access_key_id=environ["AWS_ACCESS_KEY_ID"],
            aws_secret_access_key=environ["AWS_SECRET_ACCESS_KEY"],
        ).get_queue_by_name(QueueName=queue_name)

    def get_messages(self) -> list:
        """Gets messages from the queue

        Returns:
            list: A list of messages
        """
        messages = self.queue.receive_messages()
        if len(messages) > 0:
            self.logging_service.log(f"Received {len(messages)} messages")
        return messages
