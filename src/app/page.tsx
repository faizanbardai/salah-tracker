"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  if (session?.user) {
    redirect("/prayer");
  }
  return <main className="container mx-auto"></main>;
}
