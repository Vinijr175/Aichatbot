# React AI Chatbot (Refactored & Secured)

A professional, refactored React + TypeScript chatbot that communicates securely with an Express backend proxy to interface with OpenRouter. 

---


## ⚡ Setup & Installation

Follow these instructions to run the application locally.

### 1. Backend Server Setup
1. Open a terminal and navigate to the server folder:
   ```bash
   cd server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   copy .env.example .env
   ```
4. Open the `.env` file and insert your OpenRouter API key:
   ```env
   PORT=3001
   OPENROUTER_API_KEY=your_real_openrouter_api_key
   ```
5. Start the backend server:
   ```bash
   npm start
   ```
   *The server will run on `http://localhost:3001`.*

### 2. Frontend React Setup
1. Open a new terminal window and navigate to the frontend folder:
   ```bash
   cd react-chatbot
   ```
2. Install the frontend dependencies (including Vitest testing packages):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The app will run on `http://localhost:3000`.*

---

## 🧪 Running Tests
To run the Vitest unit tests on the frontend:
1. Navigate to the `react-chatbot` directory:
   ```bash
   cd react-chatbot
   ```
2. Execute the test suite:
   ```bash
   npm run test
   ```

---

## 📝 Design Decisions & Architectural Answers

### 1. Why is it unsafe to call OpenRouter directly from the browser?
If you make requests directly to OpenRouter from the frontend, your OpenRouter API Key must be sent in the request header (`Authorization: Bearer <key>`). Because the browser is a public client, any user can open their browser's **Network tab** in Developer Tools, click on the API request, and copy your API Key. Additionally, any API key bundled as a Vite environment variable (prefixed with `VITE_`) gets compiled directly into the static JS files, making it publicly readable by anyone downloading your app bundle.

### 2. Where is your API key stored now, and why is that better?
The API key is stored securely in a local `.env` file inside the `server/` directory. This file is excluded from Git tracking via `.gitignore`. The Express backend loads it at runtime using `process.env.OPENROUTER_API_KEY`. It is never sent to the client browser, rendering it impossible for a public user to extract.

### 3. What happens in the UI if the AI request fails?
* If the server is offline or fails to respond, the custom hook catches the error and appends a user-friendly system message: **"Could not reach the AI service. Please verify your backend server is running."**
* If the OpenRouter API key is missing on the server, the server responds with a `500` status, and the UI displays: **"Missing API key. Check your environment setup."**
* The `isLoading` state is set to `false`, disabling the spinner and re-enabling the input so the user can try again. The error is styled as a clear warning alert card in the chat log.

### 4. What TypeScript types did you create, and why?
We created four main types in `src/types/chat.ts`:
* `Message`: Standardized chat message structure (text, sender: `'user' | 'bot' | 'system'`).
* `ChatRequest` & `ChatResponse`: Strongly typed contracts for the frontend-backend communication.
* `ErrorResponse`: Strongly typed format for server-side error messages.
These types prevent typos, simplify debugging, ensure autocompletion works in the IDE, and enforce type safety when mapping message states.

### 5. How does your frontend communicate with your backend/serverless endpoint?
The frontend sends requests to `/api/chat` using Axios. We configured a **Vite proxy** in `vite.config.ts` so that in development mode, any request starting with `/api` is transparently forwarded to `http://localhost:3001`. This keeps our frontend code clean (using relative URLs) and bypasses CORS policies.

### 6. What did your tests cover?
Our Vitest suite covers the following in `src/hooks/useChatbot.test.ts`:
1. **Initial State**: Verifies the hook starts with an empty list of messages and `isLoading` set to false.
2. **Success Flow**: Verifies that when a message is sent, the user's message is immediately added to the list, loading is enabled, and when the mock API succeeds, the bot's response is appended.
3. **Error Handling**: Verifies that when the API fails, the hook catches the exception, updates `isLoading` to false, and appends a helpful system error message.

### 7. If this app had real users, what would you improve next?
1. **User Authentication & Rate Limiting**: Implement JWT auth (e.g. Firebase or Auth0) and rate-limit API calls on the backend to prevent malicious users from draining our OpenRouter quota.
2. **Database Chat History**: Save messages to a database (e.g., MongoDB, PostgreSQL) so users don't lose their chats on page refresh.
3. **Streaming Responses**: Modify the Express server and React hook to support Server-Sent Events (SSE) so responses stream word-by-word, matching ChatGPT's UX.
