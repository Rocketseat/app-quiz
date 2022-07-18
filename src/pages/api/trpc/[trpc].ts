import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
import { z } from 'zod';
import { redis } from '../../../lib/database';
import { questions } from '../../../lib/questions';

async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  return {
    session: await getSession({ req: opts?.req })
  }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const appRouter = trpc
  .router<Context>()
  .query('fetch-question', {
    async resolve({ ctx }) {
      if (!ctx.session) {
        throw new trpc.TRPCError({ code: 'UNAUTHORIZED' });
      }
    
      const allQuestionsAnswered = await redis.hgetall(ctx.session.id);
      
      let order = 1;
      
      if (allQuestionsAnswered) {
        const questionsAnswered = Object.keys(allQuestionsAnswered).map(Number)
    
        order = questionsAnswered.length > 0 
          ? (Math.max(...questionsAnswered) + 1) 
          : 1;
      }
    
      const question = questions.find(question => question.order === order);
    
      if (!question) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Question not found.',
        })
      }
    
      const questionAlreadyAnswered = await redis.hget(ctx.session.id, String(order))
    
      if (questionAlreadyAnswered) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'Question already answered.',
        })
      }
    
      const { description, options } = question

      return {
        order,
        description,
        options,
      };
    },
  })
  .query('fetch-results', {
    async resolve({ ctx }) {
      if (!ctx.session) {
        throw new trpc.TRPCError({ code: 'UNAUTHORIZED' });
      }
    
      const result = await redis.zscore('ranking', ctx.session.id);
      
      return { result }
    }
  })
  .mutation('send-answer', {
    input: z.object({
      order: z.number(),
      answer: z.number(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session) {
        throw new trpc.TRPCError({ code: 'UNAUTHORIZED' });
      }
    
      const { order, answer: userAnswer } = input
    
      const question = questions.find(question => question.order === order)
    
      if (!question) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Question not found.',
        })
      }
    
      const questionAlreadyAnswered = await redis.hget(ctx.session.id, String(order))
    
      if (questionAlreadyAnswered) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'Question already answered.',
        })
      }
    
      const isRightAnswer = question.answer === userAnswer;
    
      await redis.hset(ctx.session.id, {
        [String(order)]: userAnswer,
      })
    
      if (isRightAnswer) {
        await redis.zincrby('ranking', 1, ctx.session.id)
      }

      const lastQuestionOrder = Math.max(...questions.map(question => question.order));

      if (order === lastQuestionOrder) {
        return { finished: true }
      }

      return {}
    }
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  batching: {
    enabled: true,
  },
});