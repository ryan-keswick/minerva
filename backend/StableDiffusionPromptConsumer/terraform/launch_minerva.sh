#!/bin/sh
# This script is used to launch the minerva container
# It is called by the terraform script on the ec2 instance

sudo yum update -y
aws ecr get-login-password --region us-east-1 | \
 docker login --username AWS --password-stdin 777680051979.dkr.ecr.us-east-1.amazonaws.com

docker run --gpus all 777680051979.dkr.ecr.us-east-1.amazonaws.com/minerva/stablediffusionpromptconsumer:0.1.3
