import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"
import { redis } from "../../lib/database";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated.' })
  }

  const result = await redis.zscore('ranking', session.id);
  
  return res.json({
    result,
  })
}