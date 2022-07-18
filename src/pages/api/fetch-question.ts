import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"
import { questions } from "../../lib/questions"
import { redis } from "../../lib/database";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated.' })
  }

  const allQuestionsAnswered = await redis.hgetall(session.id);
  
  let order = 1;
  
  if (allQuestionsAnswered) {
    const questionsAnswered = Object.keys(allQuestionsAnswered).map(Number)

    order = questionsAnswered.length > 0 
      ? (Math.max(...questionsAnswered) + 1) 
      : 1;
  }

  const question = questions.find(question => question.order === order);

  if (!question) {
    return res.status(400).json({ message: 'Question not found.', code: 'finished' })
  }

  const questionAlreadyAnswered = await redis.hget(session.id, String(order))

  if (questionAlreadyAnswered) {
    return res.status(400).json({ message: 'Question already answered.' })
  }

  const { description, options } = question

  return res.json({
    order,
    description,
    options,
  })
}