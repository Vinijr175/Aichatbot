React AI Chatbot (OpenRouter + Gemma)

A modern AI chatbot built using React + TypeScript + Vite, powered by OpenRouter API with the google/gemma-3-12b-it model. The chatbot allows users to send messages and receive intelligent AI-generated responses in real time.

Features
Real-time chat interface
AI responses using OpenRouter (Gemma model)
Loading animation while AI responds
Markdown support for formatted AI responses
Auto-scroll to latest message
Clean UI with React components
Environment variable for API key security
Tech Stack
React (TypeScript)
Vite
Axios
OpenRouter API
React Markdown
ESLint
How It Works
User types a message in the chat input
Message is stored in React state
useChatbot sends request to OpenRouter API
AI model processes the prompt (Gemma 3)
Response is returned and displayed in chat UI
UI updates automatically with loading animation
Installation and Setup
git clone https://github.com/Vinijr175/react-chatbot.git
cd react-chatbot
npm install
npm run dev

Key Concepts Used
React Hooks (useState, useEffect, useRef)
Custom Hooks
API Integration (Axios)
Async/Await
Conditional Rendering
State Management
Environment Variables
