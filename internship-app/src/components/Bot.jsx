import React from "react";
import styled from "styled-components";

export default function Bot() {
  const embeddedUrl = "https://intern-bot-fnh7ksmlfcgy7dawdyxapc.streamlit.app";

  const handleRedirect = () => {
    window.open(embeddedUrl, "_blank");
  };

  return (
    <div>
      <Button onClick={handleRedirect}>Open Intern Bot</Button>
    </div>
  );
}
const Button = styled.button`
  background-color: #997af0;
  color: white;
  padding: 0.5rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: #4e0eff;
  }
`;
