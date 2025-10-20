# Kaiburr Assessment - Task 3: React WEB UI

This repository contains the frontend application for the Kaiburr assessment, built using **React**, **TypeScript**, and **Ant Design**. This web UI provides a full-featured interface to create, search, delete, and execute tasks by communicating with the Java REST API built in Task 1.

---

## Project Overview

This application was bootstrapped using **Vite** with the **React + TypeScript** template. It uses **Axios** as the HTTP client to make all API requests to the backend.

The UI is built entirely with components from the **Ant Design** library, including `Layout`, `Table` (with expandable rows), `Modal` forms, `Buttons`, and `Collapse` panels to create a clean and functional user experience.

All application state, such as the list of tasks, is managed using React's `useState` hook. API calls are handled via `async/await` functions that update the state and provide user feedback (e.g., "Task created successfully!") using the Ant Design `message` component.

### Key Features:
* **Full CRUD:** The UI supports all required operations:
    * **Create:** A modal form (`<Modal>` with `<Form>`) is used to create new tasks.
    * **Read (All & Search):** The main table displays all tasks. A search modal filters tasks by name, and a "Show All Tasks" button resets the filter.
    * **Delete:** A "Delete" button on each row removes the task from the database.
* **Task Execution:** The "Execute" button runs the task on the backend.
* **Execution History:** The table features expandable rows (`<Table expandable>`) that display the full execution history for each task, including the command output, start time, and end time.

### Backend Connection & CORS

The application is configured in `src/api.ts` to connect to the Task 1 Java backend at `http://localhost:8080`. For the frontend (running on `http://localhost:5173`) to communicate with the backend, a `WebConfig` file was added to the Java project to enable **CORS (Cross-Origin Resource Sharing)**.

---

## How to Run

1.  **Run the Backend:** Start your **Task 1 (Java) application** first.
2.  **Install Dependencies:** Open a terminal in this project's root folder (`kaiburr-task-3`) and run:
    ```bash
    npm install
    ```
3.  **Run the App:** In the same terminal, run:
    ```bash
    npm run dev
    ```
4.  **Access:** Open your browser and navigate to `http://localhost:5173`.

---

## Application Screenshots

Here are the screenshots demonstrating the full functionality of the web UI.

### 1. The "Create Task" Modal

<img width="959" height="449" alt="task3-1" src="https://github.com/user-attachments/assets/0ae1d339-b284-4884-aab5-b55b132d6a2a" />

### 2. Successful Task Creation

<img width="959" height="449" alt="task3-2" src="https://github.com/user-attachments/assets/b6a3fee8-f36e-4982-927c-4405af7e6479" />

### 3. Successful Task Execution & History

<img width="959" height="449" alt="task3-3" src="https://github.com/user-attachments/assets/5c904f61-dc7e-4cca-b3b5-92e56294f473" />

### 4. The "Search by Name" Modal

<img width="959" height="449" alt="task3-4" src="https://github.com/user-attachments/assets/dd425d4d-19e1-45e9-9b4b-3b265ad2fdbb" />

### 5. Successful Search Results

<img width="959" height="449" alt="task3-5" src="https://github.com/user-attachments/assets/ba6c7554-c0ec-44bd-8b4d-1270ac6713e4" />

### 6. Successful Task Deletion
<img width="959" height="510" alt="task3-6" src="https://github.com/user-attachments/assets/87c2ecc5-079e-4796-bd0b-9215489fa9d7" />
<img width="959" height="506" alt="task3-7" src="https://github.com/user-attachments/assets/c4d1722a-cf66-4b59-b0e0-28e331d47de8" />

