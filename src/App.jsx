import { useState } from "react";
import "./App.css";
import axios from "axios";
import LoadingDots from "./LoadingDots";
function App() {
  // ReactのuseStateフックを使用して、いくつかの状態を初期化します。
  // promptはユーザーからの入力を保持します。
  const [prompt, setPrompt] = useState("");
  // questionは送信されたユーザーの問い合わせを保持します。
  const [question, setQuestion] = useState("");
  // responseはChatGPTからの応答を保持します。
  const [response, setResponse] = useState("");
  // API_KEYは環境変数から読み込まれるOpenAIのAPIキーです。
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  // handlePromptは非同期関数で、ユーザーの入力をOpenAIのAPIに送信し、応答を処理します。
  const handlePrompt = async () => {
    try {
      // レスポンスを"Loading"に設定し、UIにローディング状態を示します。
      setResponse("Loading");
      // prompt状態をquestion状態に設定し、送信された問い合わせを表示します。
      setQuestion(prompt);
      // axiosを使って、OpenAIのAPIにポストリクエストを送信します。
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        JSON.stringify({
          model: "gpt-3.5-turbo", // 使用するモデル
          messages: [{ role: "user", content: prompt }], // ユーザーの役割とコンテンツ
        }),
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`, // APIキーをヘッダーに添付
            "Content-Type": "application/json", // コンテンツタイプを指定
          },
        }
      );
      // 応答のログをコンソールに表示します（デバッグ用）。
      console.log(response);
      // APIからの応答をresponse状態に設定します。
      setResponse(response.data.choices[0].message.content);
      // prompt状態をリセットし、入力フィールドをクリアします。
      setPrompt("");
    } catch (error) {
      // エラーが発生した場合、エラーメッセージをresponse状態に設定します。
      setResponse(`Error ChatGPT: ${error}`);
    }
  };

  // setResponseSampleは、サンプルのレスポンスをresponse状態に設定する関数です。
  // 実際のAPI呼び出しではなく、デモまたはテスト用に使用される可能性があります。
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
