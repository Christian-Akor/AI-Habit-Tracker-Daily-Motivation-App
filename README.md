AI Habit Tracker - Daily Motivation App

A beautiful, fully-featured habit tracking application built with Vue 3 and Tailwind CSS. Track your daily habits, build streaks, and stay motivated with daily inspirational quotes!

![Light Mode](https://github.com/user-attachments/assets/cd638a2a-3280-41b3-8e48-7f8f41d3c261)

## ✨ Features

- 📝 **Add/Edit/Delete Habits** - Complete CRUD operations for managing your habits
- 📊 **Progress Tracking** - Visual progress bars showing your completion percentage
- 🔥 **Streak Tracking** - Monitor your current streak and longest streak for each habit
- 🎉 **Confetti Celebrations** - Celebrate milestones and achievements with confetti animations
- 🌓 **Dark Mode** - Toggle between light and dark themes with automatic persistence
- 💭 **Daily Quotes** - Get inspired with daily motivational quotes from the Quotable API
- 💾 **LocalStorage** - All your data persists across browser sessions
- 📱 **Responsive Design** - Works beautifully on all screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Christian-Akor/AI-Habit-Tracker-Daily-Motivation-App.git
cd AI-Habit-Tracker-Daily-Motivation-App
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework with Composition API
- **Vite** - Next-generation frontend tooling for fast development
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Quotable API** - Free API for inspirational quotes
- **LocalStorage API** - Browser storage for data persistence
- **Canvas API** - For confetti animation effects

## 📁 Project Structure

```
src/
├── components/
│   ├── ConfettiEffect.vue    # Confetti animation component
│   ├── DailyQuote.vue         # Daily quote display component
│   ├── HabitForm.vue          # Form for adding/editing habits
│   └── HabitList.vue          # List display for all habits
├── composables/
│   ├── useDailyQuote.js       # Composable for fetching daily quotes
│   ├── useDarkMode.js         # Composable for dark mode toggle
│   └── useHabits.js           # Composable for habit CRUD operations
├── App.vue                    # Main application component
├── main.js                    # Application entry point
└── style.css                  # Global styles with Tailwind imports
```

## 🎯 How to Use

1. **Add a Habit**: Fill in the habit form with a name, description, and goal (days)
2. **Track Progress**: Click "Mark as Done" to complete a habit for the day
3. **Build Streaks**: Complete habits on consecutive days to build your streak
4. **Edit Habits**: Click the edit icon to modify habit details
5. **Delete Habits**: Click the delete icon to remove a habit
6. **Toggle Dark Mode**: Click the sun/moon icon in the header
7. **Get Inspired**: Read the daily quote or click "New Quote" for more inspiration

## 🎨 Features in Detail

### Habit Tracking
- Set custom goals for each habit (number of days)
- Track completion with visual progress bars
- See your progress as a percentage

### Streak System
- **Current Streak**: Shows consecutive days of completion
- **Longest Streak**: Your all-time best streak
- Streaks reset if you miss a day

### Celebrations
- Confetti animations trigger on milestone streaks (every 7 days)
- Special celebration when you reach your goal (100% completion)

### Dark Mode
- System preference detection on first load
- Manual toggle persists across sessions
- Smooth transitions between themes

### Daily Quotes
- Fresh quote each day from Quotable API
- Cached for 24 hours to reduce API calls
- Manual refresh option available

## 🔒 Security

This application has been scanned with CodeQL and contains no security vulnerabilities. All data is stored locally in your browser's localStorage - no server-side storage or external data transmission (except for fetching quotes).

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Christian Akor**
Built with ❤️ using Vue 3 and Tailwind CSS
