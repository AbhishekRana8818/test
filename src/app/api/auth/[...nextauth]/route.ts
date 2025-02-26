import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { cookies } from "next/headers";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    accessToken?: string;
    idToken?: string;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID as string,
    }),
  ],
  secret: "asdfasdf",
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account , profile}) {
      console.log("the profile is " , profile);
      if (account) {
        token.idToken = account.id_token as string;
        token.accessToken = account.access_token as string;
      }
      console.log("the toke ins" , token);
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      let cookie = await cookies();
      cookie.set("idToken", session.idToken);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
