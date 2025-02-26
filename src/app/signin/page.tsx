"use client";
import { signIn, signOut } from "next-auth/react";

export default function signin() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <button
        className="p-5 rounded-lg bg-white text-black"
        onClick={() => signIn("azure-ad")}
      >
        SignIn
      </button>

      <button
        className="p-5 rounded-lg bg-white text-black"
        onClick={() => signOut()}
      >
        Signout
      </button>
    </div>
  );
}
