##    React AI Chatbot 

A professional, React + TypeScript chatbot that communicates securely with an Express backend proxy to interface with OpenRouter. 


 Setup & Installation

Follow these instructions to run the application locally.

 ## Backend Server Setup

   
1. Open a terminal and navigate to the server folder:
   bash
   cd server
   
2. Install the backend dependencies:
   bash
   npm install
   
3. Create a .env file from the example:
   bash
   copy .env.example .env
   
4. Open the .env file and insert your OpenRouter API key:
   env
   PORT=3001
   OPENROUTER_API_KEY=your_real_openrouter_api_key
   
5. Start the backend server:
   bash
   npm start
   
   The server will run on http://localhost:3001.
   

##  Frontend React Setup

 
1. Open a new terminal window and navigate to the frontend folder:
   bash
   cd react-chatbot
   
2. Install the frontend dependencies (including Vitest testing packages):
   bash
   npm install
   
3. Start the Vite development server:
   bash
   npm run dev
   
   The app will run on http://localhost:3000.


##  Running Tests
To run the Vitest unit tests on the frontend:
1. Navigate to the react-chatbot directory:
   bash
   cd react-chatbot

2. Execute the test suite:
   bash
   npm run test


