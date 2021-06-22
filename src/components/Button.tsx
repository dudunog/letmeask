import { useState } from "react";

export function Button() {
  const [counter, setCounter] = useState(0);

  function increment() {
    var number = counter + 1;
    setCounter(number);
    console.log(counter);
  }

  return <button onClick={increment}>{counter}</button>;
}
