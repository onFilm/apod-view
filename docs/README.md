# 🌌 APOD View

Welcome to the **APOD View** documentation! This project is the frontend client for the APOD (Astronomy Picture of the Day) application ecosystem. It acts as an interactive UI to display, search, and explore the historical APOD data served by the backend API.

---

## 📌 Overview

**APOD View** is a modern Single Page Application (SPA) built with Angular. It allows users to infinitely scroll through historical Astronomy Pictures of the Day, search for specific terms or dates, and view full records. The app connects seamlessly to the local `json-server` provided by the APOD Daily Data Extractor (expected to be running on port `8888`).

---

## 🚀 Features

- **Infinite Scrolling**: Browse thousands of historical APOD entries smoothly using pagination and chunked data loading.
- **Search & Filtering**: Search the vast APOD database instantly with term matching and date-specific queries.
- **Full Record View**: Dive deep into a specific day's astronomical picture with dedicated full-record routing.
- **State Management**: Robust application state control powered by NgRx (`@ngrx/store`).
- **Responsive UI**: Styled using Semantic UI to provide a clean, modern, and engaging user experience.
- **Docker Ready**: Includes a `Dockerfile` and custom npm scripts for easy containerized deployments.

---

## 🛠️ Technology Stack

- **Framework**: Angular (v17.3)
- **State Management**: NgRx (`@ngrx/store`, `@ngrx/effects`, `@ngrx/entity`)
- **UI & Styling**: Semantic UI CSS
- **Utilities**: `ngx-infinite-scroll`, `ngx-pagination`, RxJS
- **Containerization**: Docker

---

## 📂 Project Structure

A brief overview of the critical paths in the repository:

- `src/app/` - The core Angular application folder.
  - `src/app/container/` - Contains the main view and the `fullrecord` components.
  - `src/app/search/` - Components responsible for the search and refine functionality.
  - `src/app/store/` - NgRx state management (actions, reducers, and selectors for APOD data).
  - `src/app/service/apod-data.service.ts` - The HTTP service that interfaces with the backend APOD `json-server`.
  - `src/app/app.routes.ts` - Application routing definition.
- `Dockerfile` - For running the dev server inside a Docker container.

---

## 🔗 API Integration

The application expects the backend API (the APOD Daily Data Extractor) to be available on the same hostname at port `8888`. It leverages standard `json-server` queries:
- **Pagination**: `?_page=X&_limit=Y`
- **Sorting**: `?_sort=date&_order=desc`
- **Searching**: `?q=searchTerm`
- **Specific Date**: `?date=YYYY-MM-DD`

---

## ⚙️ Setup and Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed along with the [Angular CLI](https://angular.io/cli).

### Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Dev Server:**
   Start the application locally. Navigate to `http://localhost:4200/`.
   ```bash
   npm start
   # or
   ng serve
   ```
   *Note: Ensure your APOD backend API is running on port 8888 so data loads successfully.*

3. **Build for Production:**
   Run the build command to generate production-ready artifacts in the `dist/` directory.
   ```bash
   npm run build
   ```

### 🐳 Docker Deployment

You can run the application using Docker, which is particularly useful for local network deployments.

1. **Build and Run (using npm script):**
   ```bash
   npm run start_in_docker
   ```
   This executes `ng analytics off & ng serve --host 0.0.0.0`, exposing the server to your local network.

Alternatively, use standard Docker commands to build and run the included `Dockerfile`.

---

## 📝 Running Tests

- **Unit Tests**: Run `npm test` or `ng test` to execute the unit tests via Karma.
