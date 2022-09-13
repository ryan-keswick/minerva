```
docker buildx build --platform linux/arm64,linux/amd64 --push -t 777680051979.dkr.ecr.us-east-1.amazonaws.com/minerva:latest .
```

```
aws ecr get-login-password --region us-east-1 --profile personal | docker login --username AWS --password-stdin 777680051979.dkr.ecr.us-east-1.amazonaws.com
```
