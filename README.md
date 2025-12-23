# ❄️ My Cozy Winter Dashboard
A personalized, aesthetic web application built with **React** during winter break to stay productive, mindful, and cozy.

🚀 **Live Demo:** [https://diana-cozy-corner.netlify.app/](https://diana-cozy-corner.netlify.app/)

---

## ✨ Features
- **🕒 Real-time Clock:** Keeps you on track with a live-updating digital display.
- **☁️ Mood Tracker:** A mindful corner to check in with your feelings (Moody, Productive, or Sleepy).
- **✨ Smart To-Do List:** - Persistent storage (Data stays even if you refresh!).
  - Dynamic fireworks celebration 🎆 when all tasks are complete.
  - Responsive design that handles long text.
- **🎵 Penguin Lo-Fi Player:** Integrated music section for those deep-work study vibes.
- **🌙 Theme Switcher:** Toggle between "Daytime Snow" and "Midnight Cabin" modes.
- **📜 Wisdom Generator:** A curated list of some cozy and encouraging quotes.

---

## 🗺️ The Development Roadmap (How I Built This)
1.  **Phase 1: Foundations & State Management**
    - Learned the difference between RAM-based logic and React's `useState`.
    - Implemented the Live Clock using `setInterval` and the `useEffect` cleanup pattern.
2.  **Phase 2: Data Persistence & Serialization**
    - Learned how to use `localStorage` to save user data.
    - Mastered **JSON Serialization** (`stringify` and `parse`) to bridge the gap between JavaScript objects and browser storage.
3.  **Phase 3: UI/UX & Glassmorphism**
    - Built a modern "Glass" UI using CSS `backdrop-filter` and transparency.
    - Solved complex CSS layout challenges involving **Flexbox** (Rows vs. Columns) and fixed positioning.
    - Handled text-wrapping and responsive container logic for a polished look.
4.  **Phase 4: Advanced React Hooks & Assets**
    - Used `useRef` to target HTML5 Audio elements for the music player.
    - Implemented `useRef` to track "Previous State" to trigger the Confetti celebration at exactly the right moment.
5.  **Phase 5: Deployment & DevOps**
    - Learned the Git "Three-Step" (`add`, `commit`, `push`) to manage code on **GitHub**.
    - Successfully deployed the production build to **Netlify** with automatic updates.

---

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Styling:** CSS3 (Flexbox, Glassmorphism, Animations)
- **Libraries:** `canvas-confetti`
- **Deployment:** Netlify
- **Assets:** Local MP3 and SVG assets

---

## 💻 How to run locally
1. Clone the repo
2. Run `npm install`
3. Run `npm start`
