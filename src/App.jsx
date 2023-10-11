import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handlePrompt = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "Javascriptを教えてください。" }],
        }),
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(response.data.choices[0].message.content);
    } catch (error) {
      console.error(`Error ChatGPT: ${error}`);
    }
  };
  return (
    <>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></input>
      <button onClick={() => handlePrompt()}>prompt</button>
      <button onClick={() => console.log(import.meta.env.VITE_OPENAI_API_KEY)}>
        api
      </button>
      {response}
    </>
  );
}

export default App;
