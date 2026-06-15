export interface Message {
    text: string;
    sender: 'user' | 'bot' | 'system';
}

export interface ChatRequest {
    messages: Array<{
        role: 'user' | 'assistant' | 'system';
        content: string;
    }>;
}

export interface ChatResponse {
    content: string;
}

export interface ErrorResponse {
    error: string;
    details?: string;
}
