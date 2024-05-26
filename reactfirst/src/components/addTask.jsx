import React, { useState } from 'react';
import axios from 'axios';
import './addtask.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes  } from '@fortawesome/free-solid-svg-icons';

library.add( faTimes  );

const TaskManager = ({onClose }) => {
  const [newTask, setNewTask] = useState({
    userId: '2',
    title: '',
    category: '',
    dueDate: '',
    estimateNumber: '',
    estimateUnit: '',
    importance: '',
    status: 'To Do' // Set default status to 'To Do'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      await axios.post('http://localhost:5255/api/Task', newTask);
      setNewTask({
        userId: '2',
        title: '',
        category: '',
        dueDate: '',
        estimateNumber: '',
        estimateUnit: '',
        importance: '',
        status: 'To Do'
      });
      
      onClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="task-manager">
      <div className="close-icon" onClick={onClose}> 
         <FontAwesomeIcon icon={faTimes}/>
      </div>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="category"
          value={newTask.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="estimateNumber"
          value={newTask.estimateNumber}
          onChange={handleChange}
          placeholder="Estimate Number"
          required
        />
        <input
          type="text"
          name="estimateUnit"
          value={newTask.estimateUnit}
          onChange={handleChange}
          placeholder="Estimate Unit"
          required
        />
        <select
          name="importance"
          value={newTask.importance}
          onChange={handleChange}
          
        >
          <option value="" disabled>Select Importance</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskManager;
