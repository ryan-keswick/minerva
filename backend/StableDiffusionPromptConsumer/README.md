```
docker buildx build --platform linux/arm64,linux/amd64 --push -t 777680051979.dkr.ecr.us-east-1.amazonaws.com/minerva/stablediffusionpromptconsumer:latest .
```

```
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 777680051979.dkr.ecr.us-east-1.amazonaws.com
```

For g5g
ami-0126d561b2bb55618
