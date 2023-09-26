import { createContext, useState } from 'react';

export const initialState = { loading: true, list: [], models: [], user: null };
export const ChatContext = createContext(initialState);

export default function ChatProvider({ children, user }) {
  const [chat, setChat] = useState(initialState);

  return (
    <ChatContext.Provider value={{ chat, setChat, user }}>
      {children}
    </ChatContext.Provider>
  );
}
