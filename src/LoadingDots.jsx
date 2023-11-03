import { useState, useEffect } from "react";

const LoadingDots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 現在のドットの状態に基づいて次の状態を設定
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 1000); // 1000ミリ秒ごとに更新

    // コンポーネントのアンマウント時にインターバルをクリア
    return () => clearInterval(intervalId);
  }, []); // 空の依存配列でマウント時にのみ実行

  return <>Loading{dots}</>;
};

export default LoadingDots;
