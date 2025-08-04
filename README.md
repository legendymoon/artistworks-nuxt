# ArtistWorks Nuxt.js Project

## Overview
This is a Nuxt.js application for ArtistWorks, a platform offering online music lessons. The app is built with modern web technologies, including Nuxt 3, TypeScript, Tailwind CSS, and Vue 3 Composition API.

## Features
- **Authentication**: Login and logout functionality with mock credentials.
- **Courses**: Browse courses, levels, and lessons.
- **Lessons**: View lesson details, track progress, and watch lesson videos.
- **Responsive Design**: Fully responsive UI with a collapsible sidebar and top navigation bar.
- **Dark Mode**: Tailwind CSS dark mode support.

## Project Structure
### Root Files
- **`app.vue`**: Main entry point for the app.
- **`nuxt.config.ts`**: Nuxt.js configuration file.
- **`package.json`**: Project metadata and dependencies.
- **`tailwind.config.js`**: Tailwind CSS configuration.
- **`tsconfig.json`**: TypeScript configuration.

### Key Directories
- **`assets/`**: Static assets like CSS files.
- **`components/`**: Vue components organized by feature.
  - `auth/`: Authentication components (e.g., `LoginForm.vue`).
  - `layout/`: Layout components (e.g., `Sidebar.vue`, `Topbar.vue`).
  - `lesson/`: Lesson-related components (e.g., `LessonCard.vue`, `VideoPlayer.vue`).
  - `ui/`: Reusable UI components (e.g., `DropDown.vue`, `Modal.vue`).
- **`composables/`**: Reusable logic using Vue 3 Composition API.
  - `useAuth.ts`: Manages authentication state and actions.
  - `useCourses.ts`: Manages course data and statistics.
  - `useLessons.ts`: Manages lesson data.
  - `useLessonParts.ts`: Manages lesson part data.
- **`layouts/`**: Layout templates for pages.
  - `default.vue`: Default layout with a sidebar and topbar.
- **`middleware/`**: Route guards and middleware.
  - `auth.global.ts`: Global authentication middleware.
  - `redirect-if-logged-in.ts`: Redirects logged-in users from the login page.
- **`pages/`**: Page components for routing.
  - `index.vue`: Homepage with authentication redirection.
  - `login.vue`: Login page.
  - `courses/`: Nested routes for courses and lessons.
- **`public/`**: Publicly accessible static files (e.g., images, icons).
- **`types/`**: TypeScript type definitions.
  - `course.ts`, `lesson.ts`, `lessonPart.ts`: Define types for courses, lessons, and lesson parts.
- **`utils/`**: Utility functions.
  - `formatTime.ts`: Formats time for display.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/artistworks-nuxt.git
   cd artistworks-nuxt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and add the following:
   ```
   NUXT_PUBLIC_VIDEO_BASE_URL=https://your-video-base-url.com
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev`: Start the development server.
- `npm run build`: Build the app for production.
- `npm run generate`: Generate a static site.
- `npm run preview`: Preview the production build.
- `npm run test`: Run tests using Vitest.

## Technologies Used
- **Nuxt 3**: Framework for building Vue.js applications.
- **TypeScript**: Strongly typed JavaScript.
- **Tailwind CSS**: Utility-first CSS framework.
- **Vue 3 Composition API**: Modern state management and logic encapsulation.
- **Pinia**: State management library for Vue.js.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
- **Author**: Anthony Huang
- **Email**: a.huang97808@gmail.com

