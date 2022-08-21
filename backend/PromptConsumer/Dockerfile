FROM --platform=$BUILDPLATFORM nvidia/cuda:11.4.3-cudnn8-devel-ubuntu20.04

WORKDIR /app

RUN apt-get update && \
    apt-get install -y python3-pip && \
    apt-get install -y git && \
    pip3 install --upgrade pip

COPY ./requirements.txt /app/requirements.txt

RUN pip3 install -r requirements.txt && \
    pip3 install --upgrade "jax[cuda]" -f https://storage.googleapis.com/jax-releases/jax_cuda_releases.html && \
    pip3 install "uvicorn[standard]"

COPY ./src /app
