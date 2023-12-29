"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  if (session?.user) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    redirect(`/prayer/${year}-${month}-${day}`);
  } else {
    return <main className="container mx-auto"></main>;
  }
}
