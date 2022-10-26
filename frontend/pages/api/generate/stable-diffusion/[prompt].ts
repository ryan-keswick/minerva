import type { NextApiRequest, NextApiResponse } from 'next';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';
import {
  S3_BUCKET_URL,
  QUEUE_URL,
  REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} from '@/constants/aws';
import { initialPrompt } from '@/constants/ai';
import { PrismaClient } from '@prisma/client';
import { detokenisePrompt, createKey } from '@/functions/prompts';

const prisma = new PrismaClient();

const getImages = (prompt: string) => {
  const images = [];
  for (let i = 0; i < 1; i++) {
    images.push(`${S3_BUCKET_URL}/${prompt}/${i}.png`);
  }
  return images;
};

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const addToQueue = async (prompt: string, key: string) => {
  const client = new SQSClient({
    credentials: {
      accessKeyId: String(AWS_ACCESS_KEY_ID),
      secretAccessKey: String(AWS_SECRET_ACCESS_KEY),
    },
    region: REGION,
  });
  const data = await client.send(
    new SendMessageCommand({
      DelaySeconds: 0,
      MessageBody: JSON.stringify({ prompt: prompt, key: key }),
      QueueUrl: QUEUE_URL,
    })
  );
  console.log('Success, message sent. MessageID:', data.MessageId);
};

const hasAccessToImage = async (key: string) => {
  const client = new S3Client({
    credentials: {
      accessKeyId: String(AWS_ACCESS_KEY_ID),
      secretAccessKey: String(AWS_SECRET_ACCESS_KEY),
    },
    region: REGION,
  });
  const command = new HeadObjectCommand({
    Bucket: 'minerva-images',
    Key: key,
  });
  try {
    await client.send(command);
    console.log('Success, image exists.');
    return true;
  } catch (error) {
    console.log('false, image does not exist.');
    return false;
  }
};
interface Data {
  message?: string;
  images?: string[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { prompt, userId } = req.query;

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'fail' });
    return;
  }
  if (!prompt) {
    res.status(400).json({ message: 'fail' });
    return;
  }

  const images = getImages(prompt as string);
  const key = createKey(prompt as string, userId as string);
  const url = `${S3_BUCKET_URL}/${key}`;
  if (prompt === initialPrompt) {
    res.status(200).json({
      message: 'success.',
      images: images,
    });
    return;
  }

  if (!(await hasAccessToImage(key))) {
    try {
      await addToQueue(prompt as string, key);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'fail' });
      return;
    }
    await delay(1000);
    let i = 0;
    while (!(await hasAccessToImage(key))) {
      await delay(2000);
      if (i === 600) {
        res.status(500).json({ message: 'fail' });
        return;
      }
      i++;
    }

    if (userId !== 'undefined') {
      await prisma.collection.create({
        data: {
          name: detokenisePrompt(prompt as string),
          createDate: String(new Date().getTime()),
          images: {
            create: {
              prompt: detokenisePrompt(prompt as string),
              url: url,
              createDate: String(new Date().getTime()),
            },
          },
          author: {
            connect: {
              id: userId as string,
            },
          },
        },
      });
    }
  }

  res.status(200).json({
    message: 'success.',
    images: images,
  });
};

export default handler;
