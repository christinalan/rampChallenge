import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [displayedText, setDisplayedText] = useState("");
  // const [charIndex, setCharIndex] = useState(0);
  const speed = 500;

  useEffect(() => {
    fetch(
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/726574"
    )
      .then((response) => response.text())
      .then((textResponse) => {
        const parsedData = parseAndTransform(textResponse);
        const jsonData = { data: parsedData };
        const word = jsonData.data;
        setData(word);
        // startTypingEffect(word);
      })
      .catch((error) => {
        console.error("error loading data:", error);
      });
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    if (data) {
      const intervalId = setInterval(() => {
        if (currentIndex < data.length) {
          const char = data[currentIndex];
          setDisplayedText((prevDisplayedText) => [
            ...prevDisplayedText,
            <li key={generateUniqueKey(currentIndex)}>{char}</li>
          ]);
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);
    }
  }, [data]);

  const generateUniqueKey = (index) => {
    return `${index}_${new Date().getTime()}`;
  };

  function parseAndTransform(data) {
    return data.toLowerCase();
  }

  return (
    <div className="App">{!data ? <h3>Loading...</h3> : displayedText}</div>
  );
}
