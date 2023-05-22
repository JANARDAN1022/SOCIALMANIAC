import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { DarkModeContextProvider } from './context/DarkModeContext';
import { ChatContextProvider } from './context/ChatContext';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <ChatContextProvider>
      <App />
      </ChatContextProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);

