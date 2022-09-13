#!/bin/sh
# This script is used to launch the minerva container
# It is called by the terraform script on the ec2 instance

sudo yum update -y
aws ecr get-login-password --region us-east-1 | \
 sudo docker login --username AWS --password-stdin 777680051979.dkr.ecr.us-east-1.amazonaws.com

sudo docker run --rm --gpus all nvidia/cuda:11.0.3-base-ubuntu20.04 nvidia-smi
