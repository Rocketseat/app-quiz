import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter"
import { redis } from "../../../lib/database";

export default NextAuth({
  adapter: UpstashRedisAdapter(redis),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return {
        id: user.id,
        ...session,
      }
    },
  }
})
