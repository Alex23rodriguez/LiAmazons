import type { ChangeEventHandler, FormEventHandler } from "react";
import { useState } from "react";
import type { ChatMessage } from "boardgame.io";

const Chat = ({
  onSend,
  messages,
}: {
  onSend: (message: string) => void;
  messages: ChatMessage[];
}) => {
  const [message, setMessage] = useState("");

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMessage(event.target.value);
  };

  const triggerSend: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSend(message);
    setMessage("");
  };

  return (
    <div>
      <div
        style={{
          height: "calc(100vh - 550px)",
          maxWidth: 400,
          padding: ".5em",
          overflow: "scroll",
          border: "2px solid grey",
          borderRadius: "3px",
        }}
      >
        {messages.map((message) => (
          <div key={message.id} style={{ marginBottom: ".25em" }}>
            <strong>Player {message.sender}:</strong> {message.payload}
          </div>
        ))}
      </div>
      <form onSubmit={triggerSend}>
        <input style={{ width: "80%" }} onChange={onChange} value={message} />
        <button style={{ width: "20%" }} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
