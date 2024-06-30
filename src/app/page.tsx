"use client";
import { FormEventHandler, useState } from "react";
import styles from "./page.module.css";
import CustomInputNumber from "@/components/CustomInputNumber";

export default function Home() {
  const [value, setValue] = useState(0);
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value));
  }
  return (
    <main className={styles.main}>
      <CustomInputNumber
        onChange={handleInput}
        min={0}
        max={100}
        value={value}
      />
    </main>
  );
}
