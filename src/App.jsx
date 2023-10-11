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
      <button onClick={() => console.log(prompt)}>button</button>
    </>
  );
}

export default App;
