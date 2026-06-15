import * as React from 'react';
import ChatComponent from './components/chatcomponent';
import useChatbot from './hooks/useChatbot';

const App: React.FunctionComponent = () => {
  const { messages, sendMessage, isLoading } = useChatbot();

  return (
    <div className="max-w-lg mt-20 mx-auto bg-gray-50 border border-gray-100 shadow-xl rounded-2xl overflow-hidden flex flex-col h-[600px]">
  
      <div className="w-full bg-blue-600 p-4 text-center text-white font-semibold shadow-md">
        React AI chatbot 
      </div>

      <ChatComponent messages={messages} sendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
