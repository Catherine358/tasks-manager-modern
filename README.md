# Task Queue Dashboard - React + TypeScript + Vite

A responsive task management application built with React and TypeScript. It provides task filtering, status management, form validation, and persistent data storage, with a focus on accessible UI components and keyboard navigation.

## Features

- View and filter tasks by statuses (new, done, escalated)
- Create and update tasks
- Validate form inputs with clear error messages
- Manage task forms with React Hook Form and Zod
- Manage shared UI state with Jotai
- Store task data in a Supabase PostgreSQL database
- Displays current weather based on location
- Visual representation of task by status
- Add missing data (e.g. birthdate)
- Data fetching & caching with React Query
- Works on desktop and mobile devices
- Keyboard navigation support

## Tech Stack

- React 19
- Typescript
- Tailwind CSS
- Shadcn/ui
- React Query
- Vite
- Eslint/ Prettier
- Jotai
- Supabase
- React Hook Form
- Zod

## Setup

1. Clone repository
2. cd tasks-manager-shadcn
3. npm install
4. Create a supabase database 
5. Create a .env.local file in the project root and add your Supabase credentials. 
6. Configure the Supabase database using the SQL schema and access policies required by the application. 
7. npm run dev
