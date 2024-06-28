// src/jsFiles/TaskPage.js
// src/jsFiles/TaskPage.js
import React from 'react';
import { useTasks } from './TaskContext';
import '../Styling/taskPage.css';

const TaskPage = () => {
    const { tasks } = useTasks();

    console.log('Current tasks in TaskPage:', tasks);

    return (
        <div className="task-container">
            <h1 className="task-title">Tasks</h1>
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        {task.name}
                    </li>
                ))}
            </ul>
         
        </div>
    );
};

export default TaskPage;




