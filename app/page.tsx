"use client"

import Header from "@/components/header";
import Feed from "@/components/home/feed";
import Form from "@/components/home/form";

export default function Home() {

  return (
    <main className="">
        <Header label="Home" />
        <Form placeholder="What's happening ?" />
        <Feed />
    </main>
  );
}
