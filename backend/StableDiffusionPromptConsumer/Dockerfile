FROM 777680051979.dkr.ecr.us-east-1.amazonaws.com/ubuntu-cuda11.7.1-ubuntu22.04-python3.10:1.0.0
WORKDIR /app

RUN pip install diffusers==0.3.0 transformers scipy ftfy Pillow boto3
COPY ./src /app

RUN addgroup --system docker && \
    adduser -system user --ingroup docker

USER user

CMD ["python3", "main.py"]
