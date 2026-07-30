# AI Prompt Library

A simple AI Prompt Library built with **Next.js**, **TypeScript**, **Firebase Authentication**, **Cloud Firestore**, **Redux Toolkit**, and **Tailwind CSS**.

## Prerequisites

Make sure you have installed:

- Node.js (v18 or later recommended)
- npm, yarn, pnpm, or bun
- A Firebase project

---

## 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

---

## 2. Install dependencies

Using npm:

```bash
npm install
```

or

```bash
yarn
```

or

```bash
pnpm install
```

---

## 3. Create Firebase Project

1. Go to Firebase Console.
2. Create a new project.
3. Enable **Authentication**.
4. Enable **Cloud Firestore**.
5. Register a Web App.
6. Copy the Firebase configuration.

---

## 4. Create Environment Variables

Create a file named:

```text
.env.local
```

Add the following:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

Replace each value with your Firebase configuration.

---

## 5. Run the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 6. Build for production

```bash
npm run build
```

---

## 7. Start production server

```bash
npm start
```

---

## Project Structure

```
src/
│
├── app/
├── components/
├── hooks/
├── redux/
├── services/
├── firebase/
├── types/
├── utils/
└── styles/
```

---

## Features

- Firebase Authentication
- Cloud Firestore
- Create Prompt
- View Prompt
- Search Prompts
- Filter by Category
- Sort Prompts
- Favorite Prompts
- Pin Prompts
- Dark Mode
- Responsive UI

---

## Tech Stack

- Next.js
- React
- TypeScript
- Firebase Authentication
- Cloud Firestore
- Redux Toolkit
- Tailwind CSS

---

## Scripts

```bash
npm run dev      # Start development server

npm run build    # Build production app

npm start        # Start production server

npm run lint     # Run ESLint
```

---

## License

This project is for educational and assessment purposes.