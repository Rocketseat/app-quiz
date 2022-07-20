import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { trpc } from "../../lib/trpc";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { redis } from "../../lib/database";
import { questions } from "../../lib/questions";

const answerFormSchema = z.object({
  answer: z.string(),
})

type AnswerFormInputs = z.infer<typeof answerFormSchema>;

export default function Quiz() {
  const router = useRouter()

  const { 
    data: question, 
    isLoading: isFetchingQuestion, 
    refetch,
  } = trpc.useQuery(['fetch-question'])

  const { mutateAsync: sendAnswer } = trpc.useMutation(['send-answer'])

  const { 
    register, 
    formState: { isDirty, isSubmitting }, 
    handleSubmit, 
    reset,
  } = useForm<AnswerFormInputs>({
    resolver: zodResolver(answerFormSchema),
    defaultValues: {
      answer: '',
    },
  })

  async function handleAnswerQuestion(data: AnswerFormInputs) {
    if (data.answer === null || !question?.order) {
      return;
    }

    try {
      const { finished } = await sendAnswer({
        order: question.order,
        answer: Number(data.answer),
      })

      if (finished) {
        await router.push('/app/finished')
      } else {
        await refetch()
        reset()
      }
    } catch (err: any) {
      if (err?.response.data.message){ 
        alert(err.response.data.message);
      }
    }
  }
  
  if (isFetchingQuestion || !question) {
    return <p>Carregando...</p>
  }

  if (!question.options) {
    return null;
  }

  return (
    <div className="h-screen max-w-[600px] mx-auto flex flex-col gap-8 justify-center items-center px-6">
      <h1 className="text-xl text-center">{question.description}</h1>

      <form className="w-full" onSubmit={handleSubmit(handleAnswerQuestion)}>
        <ul className="flex flex-col gap-2">
          {question.options.map((option, index) => {
            return (
              <li key={option}>
                <label className="text-lg flex items-center gap-2" htmlFor={`answer-${index}`}>
                  <input
                    className="text-violet-500 focus:outline-violet-500"
                    type="radio" 
                    value={index}
                    id={`answer-${index}`} 
                    {...register('answer')} 
                  />
                  <span className="flex-1">{option}</span>
                </label>
              </li>
              )
          })}
        </ul>

        <button 
          className="w-full bg-violet-500 px-8 py-4 rounded font-bold text-lg mt-8 disabled:opacity-50" 
          disabled={!isDirty || isSubmitting} 
          type="submit"
        >
          Responder
        </button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const allQuestionsAnswered = await redis.hgetall(session.id);
      
  if (allQuestionsAnswered) {
    const lastQuestionAnsweredOrder = Math.max(...Object.keys(allQuestionsAnswered).map(Number))
    const lastQuestionOrder = Math.max(...questions.map(question => question.order));

    if (lastQuestionAnsweredOrder === lastQuestionOrder) {
      return {
        redirect: {
          destination: '/app/finished',
          permanent: false,
        }
      }
    }
  }

  return {
    props: {}
  }
} 