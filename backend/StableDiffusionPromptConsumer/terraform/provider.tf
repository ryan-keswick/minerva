terraform {
  required_providers {
     aws = {
      source  = "hashicorp/aws"
      version = "~> 4.26.0"
    }
  }
}

provider "aws" {
  region                   = var.region
  shared_credentials_files  = ["~/.aws/credentials"]
  profile                  = "personal"
  default_tags {
    tags = {
      "project": "minerva",
      "environment": "production"
    }
  }
}
