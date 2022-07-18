import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { GithubLogo } from "phosphor-react";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <button 
        type="button" 
        onClick={() => signIn('github')}
        className="px-8 py-4 bg-zinc-800 rounded flex items-center gap-2 font-bold hover:bg-zinc-700"
      >
        <GithubLogo size={20} weight="bold" />
        Entrar com Github
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}