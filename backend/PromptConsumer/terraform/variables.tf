variable "region" {
  description = "The AWS region things are created in"
  default     = "us-east-1"
}

variable "AWS_ACCESS_KEY_ID" {
  type = string
}

variable "AWS_SECRET_ACCESS_KEY" {
  type = string
}

variable "DOCKER_IMAGE" {
  type = string
}
