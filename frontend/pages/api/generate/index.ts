import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  QUEUE_URL,
  REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} from '@constants/aws';

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const client = new SQSClient({
      credentials: {
        accessKeyId: String(AWS_ACCESS_KEY_ID),
        secretAccessKey: String(AWS_SECRET_ACCESS_KEY),
      },
      region: REGION,
    });
    try {
      const data = await client.send(
        new SendMessageCommand({
          DelaySeconds: 0,
          MessageBody: JSON.stringify({ prompt: req.body.prompt }),
          QueueUrl: QUEUE_URL,
        })
      );
      console.log('Success, message sent. MessageID:', data.MessageId);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'ok' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
