"use client";

import { useEffect } from "react";

const cat = String.raw`
   /\_/\
  ( -.- )  zzz
   > ^ <
`;

// hi, dev tools people
export function ConsoleHello() {
  useEffect(() => {
    console.log(`%c${cat}`, "color: #6fbf73; font: 600 14px ui-monospace, Menlo, monospace");
    console.log("%cHi, you found the back room.", "color: #6fbf73; font: 700 16px Georgia, serif");
    console.log("Built by Kt with Next.js, Figma, and too much coffee.\nSay hey: linkedin.com/in/thektsaylor");
  }, []);
  return null;
}
