# S3 Service for Minerva

from io import BytesIO

import boto3
from PIL import Image

from .logging_service import LoggingService


class S3Service:
    def __init__(self, logging_service: LoggingService, bucket: str):
        self.logging_service = logging_service
        self.client = boto3.client("s3")
        self.bucket = bucket

    def does_image_exist(self, key: str) -> bool:
        try:
            self.client.head_object(Bucket=self.bucket, Key=key)
            return True
        except Exception as error:
            self.logging_service.log_error(
                f"Error getting head_object, key: {key}, error: {error}"
            )
            return False

    def save_image_to_s3(self, image: Image, key: str) -> bool:
        try:
            buffer = BytesIO()
            image.save(buffer, "PNG")
            buffer.seek(0)
            self.client.put_object(Bucket=self.bucket, Body=buffer, Key=key)
        except Exception as error:
            self.logging_service.log_error(
                f"Error saving image to S3, key: {key}, error: {error}"
            )
            return False
