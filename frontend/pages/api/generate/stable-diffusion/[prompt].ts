import type { NextApiRequest, NextApiResponse } from 'next';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';
import {
  S3_BUCKET_URL,
  QUEUE_URL,
  REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} from '@constants/aws';
import { initialPrompt } from '@constants/ai';

const getImages = (prompt: string) => {
  const images = [];
  for (let i = 0; i < 9; i++) {
    images.push(`${S3_BUCKET_URL}/${prompt}/${i}.png`);
  }
  return images;
};

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const addToQueue = async (prompt: string) => {
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
      MessageBody: JSON.stringify({ prompt: prompt }),
      QueueUrl: QUEUE_URL,
    })
  );
  console.log('Success, message sent. MessageID:', data.MessageId);
};

const hasAccessToImage = async (prompt: string) => {
  const client = new S3Client({
    credentials: {
      accessKeyId: String(AWS_ACCESS_KEY_ID),
      secretAccessKey: String(AWS_SECRET_ACCESS_KEY),
    },
    region: REGION,
  });
  const command = new HeadObjectCommand({
    Bucket: 'minerva-images',
    Key: 'v1/' + prompt + '/0.png',
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
  const { prompt } = req.query;

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'fail' });
    return;
  }
  if (!prompt) {
    res.status(400).json({ message: 'fail' });
    return;
  }

  const images = getImages(prompt as string);
  if (prompt === initialPrompt) {
    res.status(200).json({
      message: 'success.',
      images: images,
    });
    return;
  }

  if (!(await hasAccessToImage(prompt as string))) {
    try {
      await addToQueue(prompt as string);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'fail' });
      return;
    }
    await delay(1000);
    let i = 0;
    while (!(await hasAccessToImage(prompt as string))) {
      await delay(1000);
      if (i === 2) {
        res.status(500).json({ message: 'fail' });
        return;
      }
      i++;
    }
  }

  res.status(200).json({
    message: 'success.',
    images: images,
  });
};

export default handler;
