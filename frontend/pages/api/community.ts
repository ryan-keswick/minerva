import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const primsa = new PrismaClient();

type Data = { prompt: string; image: string }[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const images = await primsa.prompt.findMany({
    where: {
      published: true,
    },
    select: {
      prompt: true,
      image: true,
    },
  });
  res.status(200).json(images);
};

export default handler;
