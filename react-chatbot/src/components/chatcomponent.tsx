import * as React from 'react';
import Markdown from 'react-markdown'; 
import type { Message } from '../types/chat';

interface ChatProps {
    messages: Message[];
    sendMessage: (msg: string) => Promise<void>;
    isLoading: boolean;
}

const ChatComponent: React.FunctionComponent<ChatProps> = ({ messages, sendMessage, isLoading }) => {
    const [input, setInput] = React.useState('');
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        sendMessage(input);
        setInput('');
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-white">
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'user' ? (
                            <div className="p-3 max-w-[85%] rounded-2xl text-sm shadow-sm bg-blue-600 text-white rounded-br-none whitespace-pre-wrap">
                                {msg.text}
                            </div>
                        ) : msg.sender === 'system' ? (
                            <div className="w-full p-4 rounded-xl text-sm border border-red-200 bg-red-50 text-red-700 flex items-start space-x-2 shadow-sm animate-fade-in">
                                <span className="text-base select-none mt-0.5">⚠️</span>
                                <div className="flex-1">
                                    <p className="font-semibold text-red-800 mb-0.5">System Notification</p>
                                    <p className="text-red-700 leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full max-w-[90%] text-gray-800 text-sm break-words text-left
                                            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_ol]:my-2
                                            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:my-2
                                            [&_li]:list-item">
                                <Markdown>{msg.text}</Markdown>
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex items-center space-x-1.5 p-2 text-gray-400">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex space-x-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isLoading ? "Thinking..." : "Ask me anything..."}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition disabled:bg-gray-200 disabled:text-gray-400"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatComponent;
