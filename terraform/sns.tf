terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region                   = "us-east-1"
  shared_credentials_file  = "~/.aws/credentials"
  profile                  = "personal"
}

resource "aws_sns_topic" "prompt" {
  name              = "prompt-topic"
  fifo_topic        = false
  kms_master_key_id = "alias/aws/sns"
  tags              = {"project":"minerva", "environment":"prod"}
  delivery_policy   = <<EOF
{
  "http": {
    "defaultHealthyRetryPolicy": {
      "minDelayTarget": 20,
      "maxDelayTarget": 20,
      "numRetries": 3,
      "numMaxDelayRetries": 0,
      "numNoDelayRetries": 0,
      "numMinDelayRetries": 0,
      "backoffFunction": "linear"
    },
    "disableSubscriptionOverrides": false,
    "defaultThrottlePolicy": {
      "maxReceivesPerSecond": 1
    }
  }
}
EOF
  policy            = <<EOF
{
  "Version": "2008-10-17",
  "Id": "__default_policy_ID",
  "Statement": [
    {
      "Sid": "__default_statement_ID",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "SNS:Publish",
        "SNS:RemovePermission",
        "SNS:SetTopicAttributes",
        "SNS:DeleteTopic",
        "SNS:ListSubscriptionsByTopic",
        "SNS:GetTopicAttributes",
        "SNS:AddPermission",
        "SNS:Subscribe"
      ],
      "Resource": "",
      "Condition": {
        "StringEquals": {
          "AWS:SourceOwner": "777680051979"
        }
      }
    },
    {
      "Sid": "__console_pub_0",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "SNS:Publish",
      "Resource": ""
    },
    {
      "Sid": "__console_sub_0",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "SNS:Subscribe"
      ],
      "Resource": "",
      "Condition": {
        "StringLike": {
          "SNS:Endpoint": "http://www.prompt.ryankeswick.com"
        }
      }
    }
  ]
}
EOF
}