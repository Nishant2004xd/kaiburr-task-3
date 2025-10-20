# Kaiburr Assessment: Task 3 React WEB UI

The frontend of the Kaiburr assessment app is stored in this repository and is created with the help of **React**, **TypeScript**, and **Ant Design**. This web UI has a full-fledged interface to create, search, delete, and perform tasks by interacting with the Java REST API that is implemented in Task 1.

---

## Project Overview

This app has been bootstrapped on **Vite** with **React + TypeScript** template. It is an HTTP client that utilizes the **Axios** to submit all API requests to the backend.

The UI has been developed using the **Ant Design** library to its full extent comprising of **Layout**, **Table** (expandable rows), **Modal** forms and **Buttons** as well as **Collapse** panels to give it a clean and functional user experience.

**React** is used to manage all application data including the list of tasks with the **useState** hook. The API calls are implemented through the use of functions on the form of an **async/await** that updates the state and gives the user feedback (e.g., Task created successfully!), with the help of the **Ant Design message** component.

## Key Features:

* **CRUD:** The UI provides all the necessary functions:
* **Create:** The creation of new tasks is done with the help of a modal form.
* **Read (All and Search):** The primary table represents all the tasks. There is a search modal that can be used to filter tasks by their name and a Show All Tasks button acts to clear the filter.
* **Edit:** There is a Delete button on each row, which deletes the task in the database.
* **Task Execution:** The "Execute" button executes the task at the backend.
* **Execution History:** The table contains expandable rows (`<Table expandable>`) showing the complete execution history of all tasks with the output of the command, the start and end time.

## Backend Connection & CORS

Under `src/api.ts`, the application is set to connect to the Task 1 Java backend at the port of **http 8080**. To allow the frontend (running on **http://localhost:5173**) to communicate with the backend, a **WebConfig** file was included with the Java project to allow **CORS (Cross-Origin Resource Sharing)**.

## How to Run

1.  **Starting the Backend:** First start your Java application 1.
2.  **Install Dependencies:** Run the following in a terminal in the root of this project (`kaiburr-task-3`):
    ```bash
    npm install
    ```
3.  **Execute the App:** In the terminal where you left it, execute:
    ```bash
    npm run dev
    ```
4.  **Access:** Open your browser and go to the following URL: `http://localhost:5173`.

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

