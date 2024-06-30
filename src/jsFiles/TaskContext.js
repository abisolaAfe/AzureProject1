// src/jsFiles/TaskContext.js
// src/jsFiles/TaskContext.js
// src/jsFiles/TaskContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const initialTasks = [
    { id: 1, name: 'Login', completed: false },
    { id: 2, name: 'Create a Post', completed: false },
    { id: 3, name: 'Upgrade Access to edit Posts', completed: false },
    { id: 4, name: 'Edit Existing Post', completed: false },
    { id: 5, name: 'Upgrade Access to use virtual machine', completed: false },
    { id: 6, name: 'Power On Virtual Machine', completed: false },
    { id: 7, name: 'Login to Virtual Machine', completed: false },
    { id: 8, name: 'Create a file with text in the VM', completed: false },
    { id: 9, name: 'Browse the App & explore the fileshare for your file', completed: false },
    { id: 10, name: 'Browse any website from the Virtual machine', completed: false }
];

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : initialTasks;
    });

    const completeTask = (id) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: true } : task
        );
        setTasks(updatedTasks);
    };

    const [userId, setUserId] = useState(null);

    const resetTasks = () => {
        setTasks(initialTasks);
        localStorage.removeItem('tasks');
    };

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, completeTask, resetTasks, userId, setUserId }}>
            {children}
        </TaskContext.Provider>
    );
};


