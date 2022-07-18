import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"
import { questions } from "../../lib/questions"
import { redis } from "../../lib/database"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated.' })
  }

  const { order, answer: userAnswer } = req.body

  const question = questions.find(question => question.order === order)

  if (!question) {
    return res.status(401).json({ message: 'Question does not exists.' })
  }

  const questionAlreadyAnswered = await redis.hget(session.id, String(order))

  if (questionAlreadyAnswered) {
    return res.status(400).json({ message: 'Question already answered.' })
  }

  const isRightAnswer = question.answer === userAnswer;

  await redis.hset(session.id, {
    [String(order)]: userAnswer,
  })

  if (isRightAnswer) {
    await redis.zincrby('ranking', 1, session.id)
  }

  return res.status(201).send(null);
}