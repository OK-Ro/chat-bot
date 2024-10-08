import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Send } from "lucide-react";
import styled, { keyframes, css } from "styled-components";

const blinkAnimation = keyframes`
  0%, 100% { background-color: #1a73e8; }
  50% { background-color: #34e3e5; }
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 50vh;
  background: #2a2e35;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 10;
  overflow: hidden;
  color: #f5f7fb;

  &:hover {
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 768px) {
    height: 55vh;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
  font-size: 1.2rem;

  h2 {
    color: #1a73e8;
  }

  button {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    font-size: 1rem;
    transition: color 0.3s;

    &:hover {
      color: #fff;
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ResponseContainer = styled.div`
  background: #1a73e8;
  border-radius: 20px;
  height: 20vh;
  padding: 20px;
  margin-bottom: 2.5rem;
  font-size: 1rem;
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    height: auto;
    padding: 15px;
    font-size: 0.9rem;
  }
`;

const InputForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  background: #3b3f46;
  border-radius: 30px;
  padding: 15px 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 8px 10px;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 15px;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  background: transparent;
  outline: none;
  color: #f5f7fb;

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled.button`
  background: #1a73e8;
  color: white;
  padding: 20px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: #0c5db8;
    transform: scale(1.1);
  }

  svg {
    width: 22px;
    height: 22px;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ListeningButton = styled.button`
  width: 100%;
  padding: 22px;
  border-radius: 30px;
  background: ${(props) => (props.isListening ? "#e74c3c" : "#2ecc71")};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${(props) =>
    props.isListening
      ? css`
          ${blinkAnimation} 1s ease infinite
        `
      : "none"};

  @media (max-width: 768px) {
    padding: 18px;
    font-size: 0.9rem;
  }
`;

const Spinner = styled(motion.div)`
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const AliceContent = () => {
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasIntroduced, setHasIntroduced] = useState(false);
  const [userName, setUserName] = useState("");
  const recognitionRef = useRef(null);

  const processCommand = useCallback(
    (text) => {
      let responseText = "";

      const normalizedText = text.toLowerCase();

      if (
        !hasIntroduced &&
        (normalizedText.includes("hi") || normalizedText.includes("hello"))
      ) {
        responseText = "Hi, I'm Alice. What's your name?";
        setHasIntroduced(true);
      } else if (hasIntroduced && !userName) {
        setUserName(text);
        responseText = `Nice to meet you, ${text}! How can I help you today?`;
      } else if (normalizedText.includes("how are you")) {
        responseText = "I'm doing great, thank you! What can I help you with?";
      } else if (normalizedText.includes("tell me a joke")) {
        responseText =
          "Why don't scientists trust atoms? Because they make up everything!";
      } else {
        responseText =
          "Sorry, I didn't understand that. Can you please try again?";
      }

      setResponse(responseText);
      speak(responseText);
      setIsAnimating(false);
    },
    [hasIntroduced, userName]
  );

  const handleSpeechResult = useCallback(
    (event) => {
      if (isSpeaking) return;
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();
      setInputText(transcript);
      processCommand(transcript);
    },
    [isSpeaking, processCommand]
  );

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = handleSpeechResult;
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [handleSpeechResult]);

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1.2;
    setIsSpeaking(true);

    speech.onend = () => {
      setIsSpeaking(false);
      recognitionRef.current.start();
    };

    window.speechSynthesis.speak(speech);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputText("");
    processCommand(inputText);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <Container>
      <Header>
        <h2>Alice</h2>
        <button onClick={() => setIsMinimized(!isMinimized)}>
          {isMinimized ? "Maximize" : "Minimize"}
        </button>
      </Header>

      <AnimatePresence>
        {!isMinimized && (
          <ResponseContainer>
            {isAnimating && <Spinner />}
            <p>{response || "How can I help you?"}</p>
          </ResponseContainer>
        )}
      </AnimatePresence>

      <InputForm onSubmit={handleSubmit}>
        <Input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <SubmitButton type="submit">
          <Send />
        </SubmitButton>
      </InputForm>

      <ListeningButton onClick={toggleListening} isListening={isListening}>
        {isListening ? (
          <>
            <MicOff /> Stop Listening
          </>
        ) : (
          <>
            <Mic /> Start Listening
          </>
        )}
      </ListeningButton>
    </Container>
  );
};

export default AliceContent;
