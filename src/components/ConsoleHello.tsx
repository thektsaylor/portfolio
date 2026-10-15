"use client";

import { useEffect } from "react";

// hi, dev tools people
export function ConsoleHello() {
  useEffect(() => {
    console.log("Hi, you found the back room. Built by Kt with Next.js. Say hey: linkedin.com/in/thektsaylor");
  }, []);
  return null;
}
