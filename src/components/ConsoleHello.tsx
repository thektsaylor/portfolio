"use client";

import { useEffect } from "react";

// A note for anyone who opens the dev tools.
export function ConsoleHello() {
  useEffect(() => {
    console.log("Hi, you found the back room. Built by Kt with Next.js. Say hey: linkedin.com/in/thektsaylor");
  }, []);
  return null;
}
