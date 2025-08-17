# Mindful Eats Offline: Your Personal Nutrition Tracker

Mindful Eats Offline is a modern, responsive web application designed to help you effortlessly track your daily food intake, monitor macronutrients, set nutrition goals, and view your progress, all with robust offline capabilities. Built with a focus on user experience and performance, it empowers you to manage your diet anytime, anywhere.

## Badges

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Piloteyes380/mindful-eats-offline/actions)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/badge/version-0.0.0-blue.svg)](package.json)

## Table of Contents

*   [Key Features](#key-features)

*   [Architecture Overview](#architecture-overview)

*   [Tech Stack](#tech-stack)

*   [Getting Started](#getting-started)

    *   [Prerequisites](#prerequisites)

    *   [Installation](#installation)

*   [Configuration](#configuration)

*   [Usage](#usage)

*   [Project Structure](#project-structure)

*   [Scripts](#scripts)

*   [Roadmap](#roadmap)

*   [Contributing](#contributing)

*   [Testing](#testing)

*   [License](#license)

*   [Acknowledgements](#acknowledgements)

## Key Features

*   **Intuitive Food Logging:** Easily add food entries with detailed nutritional information (calories, protein, carbs, fat).

*   **Quick Add & Search:** Rapidly log common foods or search a built-in database by name and category.

*   **Daily Nutrition Overview:** View your total daily calories and macronutrients at a glance.

*   **Personalized Goal Setting:** Define custom daily calorie and macronutrient targets.

*   **Progress Analytics:** Track your weekly average intake and compare it against your goals.

*   **Offline First:** All data is stored locally, ensuring seamless functionality without an internet connection.

*   **Responsive Design:** Optimized for a smooth experience across various devices.

## Architecture Overview

Mindful Eats Offline is a single-page application (SPA) built using React with Vite for a fast development experience. The application follows a component-based architecture, leveraging Shadcn UI for a consistent and accessible user interface, styled with Tailwind CSS.

Data persistence is handled entirely client-side using `localStorage`, enabling the application's core functionality to work offline. While `react-query` is included in the stack, it currently manages internal data state and caching, with no external API integrations implemented at this time. Routing is managed by `react-router-dom` to navigate between different views like the dashboard, food log, and settings.

## Tech Stack

| Area | Tool | Version |
|---|---|---|
|---|---|---|
| Framework | React | 18.x |
| Build Tool | Vite | 5.x |
|---|---|---|
| Language | TypeScript | 5.x |
| UI Library | shadcn-ui | Latest |
|---|---|---|
| Styling | Tailwind CSS | 3.x |
| Routing | React Router DOM | 6.x |
|---|---|---|
| State/Data | React Query | 5.x |
| UI Components | Radix UI | Latest |
|---|---|---|



## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

*   Node.js (LTS version recommended, e.g., 18.x or 20.x)

*   npm (comes with Node.js) or pnpm/yarn

### Installation

1.  **Clone the repository:**

```bash
git clone https://github.com/Piloteyes380/mindful-eats-offline.git

```
2.  **Navigate to the project directory:**

```bash
cd mindful-eats-offline

```
3.  **Install dependencies:**

```bash
npm install

# or pnpm install
    # or yarn install

```
## Configuration

This application is designed to be client-side and does not require any specific environment variables for basic operation. All data is stored locally in your browser's `localStorage`.

| ENV | Description | Example |
|---|---|---|
|---|---|---|
| N/A | No environment variables are required for local development or deployment. | N/A |



## Usage

To start the development server and run the application locally:

```bash
npm run dev

```
This will typically start the application on `http://localhost:8080`. Open this URL in your browser to interact with the application.

* *Key Interactions:**

*   **Dashboard:** View your daily nutrition summary and quick access to food categories.

*   **Add Food:** Use the central "Add" button in the bottom navigation to log new food entries. You can use quick suggestions or manual entry.

*   **Food Log:** Access the "Log" tab to see a detailed breakdown of your meals for the day.

*   **Analytics:** Navigate to the "Analytics" tab to view weekly trends and progress against your goals.

*   **Settings:** Configure daily nutrition goals, notification preferences, and units in the "Settings" tab.

## Project Structure

```
.

├── public/
├── src/

│   ├── App.tsx
│   ├── components/

│   │   ├── add-food.tsx
│   │   ├── analytics.tsx

│   │   ├── bottom-nav.tsx
│   │   ├── dashboard.tsx

│   │   ├── food-log.tsx
│   │   ├── food-search.tsx

│   │   ├── set-goals.tsx
│   │   ├── settings.tsx

│   │   └── ui/             # Shadcn UI components
│   │       ├── accordion.tsx

│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx

│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx

│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx

│   │       ├── button.tsx
│   │       ├── calendar.tsx

│   │       ├── card.tsx
│   │       ├── carousel.tsx

│   │       ├── chart.tsx
│   │       ├── checkbox.tsx

│   │       ├── collapsible.tsx
│   │       ├── command.tsx

│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx

│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx

│   │       ├── form.tsx
│   │       ├── hover-card.tsx

│   │       └── ... (many more ui components)
│   ├── hooks/

│   ├── lib/
│   │   ├── foods-database.ts # Mock food data

│   │   ├── storage.ts        # LocalStorage utilities
│   │   └── utils.ts          # Utility functions (e.g., cn for tailwind)

│   ├── pages/
│   │   ├── Index.tsx         # Main application view

│   │   └── NotFound.tsx
│   ├── assets/

│   ├── index.css
│   └── main.tsx

├── .eslintrc.js
├── components.json         # Shadcn UI configuration

├── package.json
├── postcss.config.js

├── tailwind.config.ts
├── tsconfig.json

├── tsconfig.app.json
├── tsconfig.node.json

└── vite.config.ts

```
## Scripts

| Command | Description |
|---|---|
|---|---|
| `dev` | Starts the local development server with hot-reloading. |
| `build` | Compiles the project for production. |
|---|---|
| `build:dev` | Compiles the project for development mode (e.g., for Lovable.dev). |
| `lint` | Runs ESLint to check for code quality and style issues. |
|---|---|
| `preview` | Serves the production build locally for testing. |



## Roadmap

*   [ ] Implement persistent storage for goals and settings.

*   [ ] Enhance food database with more items and search capabilities.

*   [ ] Add ability to edit and delete logged food entries.

*   [ ] Implement water intake tracking.

*   [ ] Integrate with a backend API for cloud synchronization (optional).

*   [ ] Add user authentication.

*   [ ] Improve analytics with more detailed charts and historical data.

*   [ ] Implement unit conversion for food entries (e.g., grams to ounces).

*   [ ] Add a dark mode toggle.

## Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `bugfix/issue-description`.
3.  **Make your changes** and ensure they adhere to the existing code style.
4.  **Commit your changes** with a clear and concise message.
5.  **Push your branch** to your forked repository.
6.  **Open a Pull Request** to the `main` branch of this repository, describing your changes in detail.

Please ensure your code passes linting checks before submitting a PR.

## Testing

Currently, there are no dedicated unit or integration tests configured for this project.

*   [ ] Set up a testing framework (e.g., Vitest, Jest, React Testing Library).

*   [ ] Write unit tests for core utilities and components.

*   [ ] Implement integration tests for key user flows.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

*   This project was initially generated using [Lovable.dev](https://lovable.dev/).

*   Built with [Vite](https://vitejs.dev/), [React](https://react.dev/), and [TypeScript](https://www.typescriptlang.org/).

*   Styled with [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/).

*   Icons provided by [Lucide React](https://lucide.dev/).
