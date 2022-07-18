import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from "next/router";

interface Question {
  order: string;
  description: string;
  options: string[];
}

const answerFormSchema = z.object({
  answer: z.string(),
})

type AnswerFormInputs = z.infer<typeof answerFormSchema>;

export default function Quiz() {
  const [question, setQuestion] = useState<Question | null>(null)
  const router = useRouter()

  const { register, formState: { isDirty, isSubmitting }, handleSubmit, reset } = useForm<AnswerFormInputs>({
    resolver: zodResolver(answerFormSchema),
    defaultValues: {
      answer: null,
    },
  })

  async function fetchQuestion() {
    try {
      const question = await axios.get('/api/fetch-question')

      setQuestion(question.data)
    } catch (err) {
      if (err?.response.data.code && err?.response.data.code === 'finished') {
        await router.push('/app/finished')
      }
    }
  }

  async function handleAnswerQuestion(data: AnswerFormInputs) {
    if (data.answer === null) {
      return;
    }

    try {
      await axios.post('/api/send-answer', {
        order: question.order,
        answer: Number(data.answer),
      })

      fetchQuestion();

      reset()
    } catch (err) {
      if (err?.response.data.message){ 
        alert(err.response.data.message);
      }

      console.error(err);
    }
  }

  useEffect(() => {
    fetchQuestion();
  }, [])

  if (!question) {
    return <p>Carregando...</p>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}