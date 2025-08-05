# ArtistWorks Nuxt.js Project

## Overview
This is a Nuxt.js application for ArtistWorks, a platform offering online music lessons. The app is built with modern web technologies, including Nuxt 3, TypeScript, Tailwind CSS, and Vue 3 Composition API.

## Table of Contents

- [Features](#features)
- [Architecture Decisions](#architecture-decisions)
- [Setup Instructions](#setup-instructions)
- [Docker Usage](#docker-usage)
- [Testing Strategy](#testing-strategy)
- [CI/CD Pipeline](#ci-cd-pipeline)
- [Video Asset Handling](#video-asset-handling)
- [Technology Stack](#technology-stack)

---

## Features
- **Server-Side Rendering (SSR)** for SEO and performance.
- **Modular component** design for reusability.
- **Video playback** with progress tracking and bookmarking.
- **User authentication** with social login options.
- **Responsive design** using Tailwind CSS.

---

## Architecture Decisions
1. **Framework**: Nuxt.js was chosen for its SSR capabilities and modular architecture.
2. **State Management**: Vue's composables (`useAuth`, `useCourses`, etc.) are used for lightweight and flexible state management.
3. **Testing**: Vitest is used for unit testing, ensuring fast and reliable test execution.
4. **Containerization**: Docker is used for consistent development and deployment environments.
5. **CI/CD**: GitHub Actions automates deployment to AWS S3 and CloudFront.

---

## Setup Instructions

### Prerequisites
- Node.js 18.x
- Docker (optional for containerized setup)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/artistworks-nuxt.git
   cd artistworks-nuxt
   ```
2. Install dependencies:
  ```bash
  npm install
  ```
  **Development**
  start the development server:
  ```bash
  npm run dev
  ```
  **Production Build**
  Build the project for production:
  ```bash
  npm run build
  ```
  Serve the production build:
  ```bash
  npm run start
  ```

---
  
## Docker Usage

### Build and Run
1. Build the Docker image:
   ```bash
   docker build -t artistworks-nuxt .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env artistworks-nuxt
   ```

### Docker Compose
Use `docker-compose` for multi-container setups:
```bash
docker-compose up
```

---

## Testing Strategy

### Unit Tests
Unit tests are written using Vitest. Test files are located in the `test/unit` directory.

Run tests:
```bash
npm run test
```

### Example Test
The `LoginForm.test.ts` file tests the `LoginForm` component:
```typescript
import { mount } from '@vue/test-utils';
import LoginForm from '@/components/auth/LoginForm.vue';

test('renders login form', () => {
  const wrapper = mount(LoginForm);
  expect(wrapper.find('form').exists()).toBe(true);
});
```

---

## CI/CD Pipeline

The CI/CD pipeline is configured using GitHub Actions. The workflow file is located at `.github/workflows/deploy.yml`.

### Steps
1. **Build**: The project is built using `npm run build`.
2. **Deploy**: The build artifacts are deployed to an AWS S3 bucket.
3. **Cache Invalidation**: The CloudFront cache is invalidated to reflect the latest changes.

---

## Video Asset Handling

### Storage in AWS S3
- All lesson video assets are stored in an AWS S3 bucket.
- Videos follow the structured path format: 
  ```
  /lesson-{lessonID}/part-{partID}.mp4
  ```
- This naming convention ensures videos are:
  - Organized by lesson
  - Easily retrievable by lesson and part ID
  - Compatible with programmatic access patterns (e.g., dynamic video loading)

---

## 🛠️ Tech Stack
- Vue 3 + TypeScript
- Vite for bundling
- Tailwind CSS for UI
- AWS S3 for static hosting & assets
- CloudFront for CDN and cache invalidation