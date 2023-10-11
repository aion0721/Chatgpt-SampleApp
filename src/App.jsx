import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  return (
    <>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></input>
      <button onClick={() => console.log(prompt)}>prompt</button>
      <button onClick={() => console.log(import.meta.env.VITE_OPENAI_API_KEY)}>
        api
      </button>
    </>
  );
}

export default App;
