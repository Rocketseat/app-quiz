import { trpc } from "../../lib/trpc";

export default function Quiz() {
  const {  data: results } = trpc.useQuery(['fetch-results'])

  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-2xl font-bold">Sua pontuação: {results?.result} de 20</h1>
    </div>
  );
}