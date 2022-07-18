import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Quiz() {
  const [result, setResult] = useState()

  useEffect(() => {
    axios.get('/api/fetch-results').then(response => {
      setResult(response.data.result)
    })
  }, [])

  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-2xl font-bold">Sua pontuação: {result} de 20</h1>
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