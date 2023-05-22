import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [chats,setchats]=useState([]);
  const [currentChat, setcurrentChat] = useState(null);
 // const [chats,setchats]=useState([]);

  return (
    <ChatContext.Provider value={{ chats,setchats, currentChat, setcurrentChat}}>
      {children}
    </ChatContext.Provider>
  );
};
