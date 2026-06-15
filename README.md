# React AI Chatbot

A full-stack AI chatbot built with **React + TypeScript** and a secure **Express backend proxy**. The backend communicates with OpenRouter while keeping API keys secure and out of the frontend.

## Features

* Secure backend API proxy
* React + TypeScript frontend
* OpenRouter AI integration
* Error handling with user feedback
* Unit testing with Vitest
* Shared TypeScript types
* Environment variable support

---

## Setup & Installation

### Clone the Repository

```bash
git clone https://github.com/Vinijr175/Aichatbot.git
cd Aichatbot
```

---

## Backend Server Setup

Open a terminal and navigate to the server folder:

```bash
cd server
npm install
```

Create a `.env` file from the example:

**Windows:**

```bash
copy .env.example .env
```

**Mac/Linux:**

```bash
cp .env.example .env
```

Open the `.env` file and add your OpenRouter API key:

```env
PORT=3001
OPENROUTER_API_KEY=your_real_openrouter_api_key
```

Start the backend server:

```bash
npm start
```

The backend runs on:

```text
http://localhost:3001
```

---

## Frontend React Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd react-chatbot
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

---

## Running Tests

Navigate to the frontend directory:

```bash
cd react-chatbot
npm run test
```

The tests cover:

* Chat initialization
* Successful message sending
* Error handling scenarios

---

## Architecture

```text
React Frontend → Express Backend → OpenRouter API
```

The frontend sends requests to `/api/chat`, the backend securely communicates with OpenRouter using environment variables, and the response is returned to the UI.

---

## Security

* API keys are stored in `.env`
* `.env` is excluded from Git using `.gitignore`

---

## Tech Stack

* React
* TypeScript
* Node.js
* Express
* Axios
* Vitest
* OpenRouter API
