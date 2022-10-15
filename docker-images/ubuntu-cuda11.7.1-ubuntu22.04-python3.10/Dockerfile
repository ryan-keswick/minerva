FROM nvidia/cuda:11.7.1-base-ubuntu22.04 as base
WORKDIR /app

RUN apt update -y && \
    apt upgrade -y && \
    apt -y install software-properties-common && \
    add-apt-repository -y ppa:deadsnakes/ppa && \
    apt -y update && \
    apt -y install python3.10 && \
    apt -y install python3-pip

RUN python3.10 -m pip install --upgrade pip
