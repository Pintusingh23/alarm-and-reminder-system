# ⏰ Alarm & Reminder System

A modern, feature-rich web application built with React and Tailwind CSS for managing alarms and reminders with real-time notifications and a beautiful dark-themed user interface.

## 👥 Authors

- **Pintu Singh** (230105)
- **Pranay Sarkar** (230047)
- **Fathal** (230043)

---

## 📖 Project Overview

The Alarm & Reminder System is a comprehensive web-based application designed to help users manage their daily tasks, appointments, and important events through an intuitive alarm and reminder system. Built using modern web technologies, this application provides a seamless user experience with real-time notifications, search capabilities, and flexible reminder management.

### 🎯 Project Goals

- Create an intuitive and user-friendly interface for managing reminders
- Provide real-time alarm notifications with browser integration
- Implement advanced features like search, sort, and snooze functionality
- Design a responsive layout that works seamlessly across all devices
- Deliver a modern, aesthetically pleasing dark-themed UI

---

## ✨ Key Features

### 🔔 Core Functionality
- **Create Reminders**: Add new reminders with title, notes, and custom date/time
- **Real-time Alarm Checking**: Automatic monitoring that triggers alarms at the specified time
- **Browser Notifications**: Native desktop notifications when alarms trigger
- **Snooze Functionality**: Postpone alarms by 5 minutes with a single click
- **Status Management**: Track reminders as Scheduled, Completed, or Disabled

### 🎨 User Interface
- **Dark Theme Design**: Modern gradient-based dark UI with slate/black colors
- **Responsive Layout**: Adaptive 3-column desktop and 1-column mobile layout
- **Smooth Animations**: Polished transitions and hover effects throughout
- **Status Badges**: Visual indicators for reminder states (Scheduled/Completed/Disabled)
- **Empty States**: Helpful messages when no reminders are present

### 🔧 Management Tools
- **Search Functionality**: Filter reminders by title or note content
- **Sorting Options**: 
  - Soonest First (upcoming reminders)
  - Latest First (furthest reminders)
  - Newest First (recently created)
- **Inline Editing**: Edit reminders directly without navigating away
- **Enable/Disable Toggle**: Temporarily deactivate reminders without deletion
- **Bulk Actions**: Clear all reminders with one click

### 📱 User Experience
- **Alarm Modal Popup**: Prominent center-screen alert when alarms trigger
- **Notification Permission**: Easy one-click notification setup
- **Form Validation**: Required fields prevent invalid reminder creation
- **Confirmation Dialogs**: Safety prompts for destructive actions
- **Visual Feedback**: Clear indication of all user interactions

---

## 🛠️ Technologies Used

### Frontend Framework & Libraries
- **React 18.2.0** - Modern JavaScript library for building user interfaces
- **Vite 4.3.9** - Next-generation frontend build tool for faster development
- **Tailwind CSS 3.4.1** - Utility-first CSS framework for rapid UI development

### UI Components & Icons
- **Lucide React 0.263.1** - Beautiful, consistent icon library

### Development Tools
- **PostCSS** - Tool for transforming CSS with JavaScript plugins
- **Autoprefixer** - PostCSS plugin to parse CSS and add vendor prefixes
- **ESLint** - Static code analysis tool for identifying problematic patterns

### Browser APIs
- **Notification API** - For native browser notifications
- **LocalStorage** - For potential data persistence (future enhancement)
- **Date/Time API** - For alarm scheduling and time management

---

## 📁 Project Structure

```
alarm-reminder-system/
│
├── public/                          # Static assets
│   └── vite.svg                     # Vite logo
│
├── src/                             # Source code
│   ├── components/                  # React components
│   │   ├── Header.jsx              # App header with notification toggle
│   │   ├── ReminderForm.jsx        # Form to create new reminders
│   │   ├── ControlPanel.jsx        # Search, sort, and clear controls
│   │   ├── ReminderCard.jsx        # Individual reminder display card
│   │   ├── ReminderList.jsx        # List container for all reminders
│   │   └── AlarmModal.jsx          # Alarm popup modal
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── useReminders.js         # Reminder logic and state management
│   │
│   ├── App.jsx                      # Main application component
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles with Tailwind directives
│
├── index.html                       # HTML entry point
├── package.json                     # Project dependencies and scripts
├── package-lock.json                # Locked versions of dependencies
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── eslint.config.js                 # ESLint configuration
├── .gitignore                       # Git ignore rules
└── README.md                        # Project documentation (this file)
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Pintusingh23/alarm-and-reminder-system.git
cd alarm-reminder-system
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Navigate to `http://localhost:5173` in your web browser.

---

## 📖 Usage Guide

### Creating a Reminder
1. Fill in the **Title** field (required)
2. Add optional **Notes** for additional context
3. Select **Date & Time** when the alarm should trigger
4. Click **"Add Reminder"** button

### Managing Reminders
- **Search**: Type in the search box to filter by title or note
- **Sort**: Use the dropdown to change reminder order
- **Edit**: Click the "Edit" button to modify a reminder
- **Enable/Disable**: Toggle reminders on/off without deleting
- **Delete**: Remove reminders permanently

### Handling Alarms
When an alarm triggers:
1. A modal popup appears with reminder details
2. Browser notification is sent (if enabled)
3. Choose to either:
   - **Snooze 5 min**: Postpone the alarm
   - **Mark Done**: Complete the reminder

### Enabling Notifications
1. Click the notification button in the header
2. Allow notifications in the browser prompt
3. The badge will change from "OFF" to "ON"

---

## 🎨 Design Philosophy

### Color Scheme
- **Background**: Gradient from slate-900 to black
- **Cards**: Slate-800 with slate-700 borders
- **Accents**: Blue-400 to purple-500 gradients
- **Status Colors**:
  - Scheduled: Blue-600
  - Completed: Green-600
  - Disabled: Gray-600

### Typography
- **Headers**: Bold, gradient text effects
- **Body**: Clean, readable gray text
- **Labels**: Medium weight, subtle gray

### Layout Principles
- **Mobile-First**: Responsive design starting from mobile
- **Card-Based**: Information grouped in distinct cards
- **Consistent Spacing**: Uniform padding and margins
- **Visual Hierarchy**: Clear distinction between sections

---

## 🔄 Component Architecture

### Data Flow
```
useReminders Hook (State & Logic)
    ↓
App.jsx (Main Container)
    ↓
├── Header (Notifications)
├── ReminderForm (Create)
├── ControlPanel (Search/Sort)
├── ReminderList (Display)
│   └── ReminderCard (Individual Items)
└── AlarmModal (Popup Alerts)
```



