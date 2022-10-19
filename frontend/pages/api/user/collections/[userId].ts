import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, image, PrismaClient } from '@prisma/client';

export type ResponseData = {
  collections: (collection & {
    images: image[];
  })[];
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { userId } = req.query;

  if (req.method !== 'GET') {
    res.status(405);
    return;
  }

  res.status(200).json({
    collections: await prisma.collection.findMany({
      where: {
        authorId: userId as string,
      },
      include: {
        images: true,
      },
    }),
  });
}
