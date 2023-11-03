import { useState } from "react";
import "./App.css";
import axios from "axios";
import LoadingDots from "./LoadingDots";
function App() {
  const [prompt, setPrompt] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const handlePrompt = async () => {
    try {
      setResponse("Loading");
      setQuestion(prompt);
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setResponse(response.data.choices[0].message.content);
      setPrompt("");
    } catch (error) {
      setResponse(`Error ChatGPT: ${error}`);
    }
  };
  const setResponseSample = () => {
    setResponse(
      "JavaScriptは、ウェブページの動的な要素やインタラクティブな機能を実現するために使用されるプログラミング言語です。\nHTMLやCSSと組み合わせて使用され、クライアントサイドで実行されます。JavaScriptは、ユーザーの入力に応じてページを変更したり、データを取得して表示したり、動画やアニメーションなどのマルチメディア要素を操作したりすることができます。\nまた、最近では、サーバーサイドやモバイルアプリケーションの開発にも使用されることがあります。"
    );
  };
  return (
    <>
      <div className="chat-container">
        <header className="chat-header">
          <h1>ChatGPT App</h1>
        </header>

        <div className="message-form">
          <input
            type="text"
            value={prompt}
            className="message-input"
            placeholder="Please input prompt..."
            onChange={(e) => setPrompt(e.target.value)}
          ></input>
          <button onClick={() => handlePrompt()} className="send-button">
            Ask
          </button>
        </div>

        <section className="chat-messages">
          {question && (
            <div className="message user-message">
              <div className="text">{question}</div>
            </div>
          )}

          {response && (
            <div className="message gpt-response">
              <div className="text">
                {response === "Loading" ? <LoadingDots /> : response}
              </div>
            </div>
          )}
        </section>

        <div className="info-button">
          <button className="button" onClick={() => console.log(response)}>
            Print Response to Console
          </button>
          <button className="button" onClick={setResponseSample}>
            Set Sample Response
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
