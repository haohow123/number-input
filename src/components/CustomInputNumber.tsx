"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "./CustomInputNumber.module.css";

type Props = Omit<React.HTMLProps<HTMLInputElement>, "ref">;
function CustomInputNumber(props: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [isMouseDown, setIsMouseDown] = useState<"UP" | "DOWN" | false>(false);
  const isMouseDownRef = useRef<"UP" | "DOWN" | false>(false);

  useEffect(() => {
    isMouseDownRef.current = isMouseDown;
  }, [isMouseDown]);

  function changeValue() {
    if (props.disabled) return;
    if (inputRef.current) {
      if (isMouseDownRef.current === "UP") {
        inputRef.current.stepUp();
      } else {
        inputRef.current.stepDown();
      }
      const event = new Event("input", { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
  }
  function handleTimeout() {
    timeout.current = null;
    interval.current = setInterval(changeValue, 50);
  }
  function handleMouseDown(direction: "UP" | "DOWN") {
    timeout.current = setTimeout(handleTimeout, 300);
    setIsMouseDown(direction);
  }
  function handleMouseUp() {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
      changeValue();
    }
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
    setIsMouseDown(false);
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.btn}
        onMouseDown={() => handleMouseDown("DOWN")}
        onMouseUp={handleMouseUp}
      >
        <Image src="/remove.svg" alt="remove-icon" width={40} height={40} />
      </button>
      <input {...props} type="number" ref={inputRef} className={styles.input} />
      <button
        className={styles.btn}
        onMouseDown={() => handleMouseDown("UP")}
        onMouseUp={handleMouseUp}
      >
        <Image src="/add.svg" alt="add-icon" width={40} height={40} />
      </button>
    </div>
  );
}

export default CustomInputNumber;
