// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { EmptyReturn } from '../../types/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmptyReturn>
) {
  try {
    res.redirect(200, req.body.s3Key);
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
}
