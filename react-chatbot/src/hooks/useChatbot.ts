import { useState } from 'react';
import axios from 'axios';
import type { Message, ChatResponse, ErrorResponse } from '../types/chat';

const useChatbot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false); 

    const sendMessage = async (message: string) => {
        if (!message.trim()) return;

    
        const userMsg: Message = { text: message, sender: "user" };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true); 

        
        const apiMessages = [...messages, userMsg]
            .filter(msg => msg.sender !== 'system')
            .map(msg => ({
                role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
                content: msg.text
            }));

        try {
            const response = await axios.post<ChatResponse>(
                "/api/chat",
                { messages: apiMessages },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
                       
            const botMessageContent = response.data?.content || "No response received.";
            setMessages(prev => [...prev, { text: botMessageContent, sender: "bot" }]);

        } catch (error) {
            console.error("Error fetching AI response:", error);
            
            let userFriendlyError = "Something went wrong while getting a response.";
            
            if (axios.isAxiosError(error)) {
                if (error.response) {
                
                    const serverErrorObj = error.response.data as ErrorResponse;
                    if (error.response.status === 500 && serverErrorObj.details?.includes("API key")) {
                        userFriendlyError = "Missing API key. Check your environment setup.";
                    } else {
                        userFriendlyError = serverErrorObj.details || serverErrorObj.error || userFriendlyError;
                    }
                } else if (error.request) {
                
                    userFriendlyError = "Could not reach the AI service. Please verify your backend server is running.";
                } else {
                    userFriendlyError = error.message;
                }
            } else if (error instanceof Error) {
                userFriendlyError = error.message;
            }

    
            setMessages(prev => [...prev, { text: userFriendlyError, sender: "system" }]);

        } finally {
            setIsLoading(false); 
        }
    };

    return { messages, sendMessage, isLoading };
};

export default useChatbot;
