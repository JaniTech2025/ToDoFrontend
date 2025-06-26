# ToDo Task Wizard

<ins>Github links</ins>
Frontend:
https://github.com/JaniTech2025/ToDoFrontend

Backend:
https://github.com/JaniTech2025/ToDoBackend

A full-stack ToDo task management application built with **Spring Java** and **MySql** backend and **React TypeScript** frontend.
A wizard themed task management App using which you can manage tasks, assign categories and keep your task list enchanted and clean.

## Features

- Create, update, delete, and duplicate tasks
- Assign categories to tasks
- Create new categories
- REST API based
- Responsive UI with interactive feedback
- Full-stack app: React TypeScript frontend + Spring Boot backend

### Frontend

![UI Design inspirations](./images/UI%20Inspiration.png)

## Tech Stack

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Spring Boot](https://img.shields.io/badge/Backend-SpringBoot-green?style=for-the-badge&logo=spring-boot)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?style=for-the-badge&logo=mysql)
![Maven](https://img.shields.io/badge/Build-Maven-C71A36?style=for-the-badge&logo=apache-maven)
![JPA](https://img.shields.io/badge/ORM-JPA-orange?style=for-the-badge)
![Sass](https://img.shields.io/badge/Style-Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## Screenshots

![Task App features](./images/screenshot1.png)
![Task App update categories](./images/screenshot3.png)
![Task App create task](./images/screenshot3.png)
![Task App edit task](./images/screenshot4.png)
![Task App delete task](./images/screenshot5.png)

## Flow diagram

App.tsx
├── SideBar
├── TaskListPage
│ ├── TaskCards
│ │ ├── Duplicate, Edit & Delete (icons)
│ │ └── PickCategory (category checklist)
│ ├── CategoryListPage (popup modal)
│ └── AddTaskForm (popup modal)

### Backend

![MySQL EER Diagram](./images/EERdiagram.png)

## Tech Stack

- Spring Java
- RESTful APIs
- MySQL

## Endpoints

- GET /categories
- POST /categories
- PUT /categories/:id
- DELETE /categories/:id \*\* make task category empty
- GET /todos
- GET /todos?category={} query parameters
- POST /todos
- PUT /todos/:id
- DELETE /todos/:id

## Checklist

![Project task checklist](./images/Checklist.png)

## What I learnt

- If using lombok, setter and getter may interpret column names differently (isArchived as archived)-
  can lead to naming mismatches between backend and frontend
  Preferably use:
  @Column(name = "archived")
  private boolean archived;
- Good to organise a data mapping document with database column types and names
  and frontend App variable names, as a reference
- While dealing with an array of objects, check json response for data type from backend

## Future enhancements

- Add user profiles
- Add delete category functionality
- Sort tasks by categories, date
- In the summary section, when the category is clicked, take user to selected category section.
- Search tasks between dates
- Synchronise with calendar apps for notifications to user about an event
- Add a few more easter eggs
