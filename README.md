# 🎟️ Event Booking Web App (Frontend)

A modern **React + TypeScript** frontend for the **Event Booking Web App**, allowing users to **view**, **add**, **book**, and **delete** events through a connected backend API.

This project demonstrates clean component architecture, form handling, state management, and API integration using Axios.

---

## 🚀 Features

- **Event List:** Dynamically displays all available events (title, date, venue, available seats).  
- **Add Event:** Form to create a new event with basic validation.  
- **Book Event:** “Book Now” button to reduce available seats.  
- **Delete Event:** Optional feature for removing events.  
- **Real-Time Updates:** Reflects seat count immediately after booking.  
- **Reusable Utilities:** Includes a clean date formatter utility.  
- **Minimal, Clean UI:** Simple layout with responsive design.

---

## 🧩 Tech Stack

- **React (TypeScript)** – Core framework  
- **Axios** – API communication  
- **React Hooks & Context API** – State management  
- **Tailwind CSS / CSS Modules** – Styling  
- **Vite** – Lightning-fast development build tool  

---

## 📁 Folder Structure

```
frontend/
│
├── src/
│   ├── components/
│   │   ├── EventList.tsx
│   │   ├── EventCard.tsx
│   │   ├── AddEventForm.tsx
│   │   └── Navbar.tsx
│   │
│   ├── services/
│   │   └── eventService.ts
│   │
│   ├── utils/
│   │   └── formatDate.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
└── vite.config.ts
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Configure Backend API URL
Inside `src/services/eventService.ts`, set your backend API base URL:
```ts
const API_URL = "http://localhost:5000/api/events";
```

### 3️⃣ Run the App
```bash
npm run dev
```

App runs at:  
👉 **http://localhost:5173**

## 🧠 Future Enhancements
- Search or filter events by title/date.
- Display event details in a modal.
- Add pagination or lazy loading.
- Show toast notifications on success/error.


