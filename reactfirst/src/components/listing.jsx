import React, { useState, useEffect } from 'react';
import Task from './task';
import Taskcard from './taskcard';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faListCheck, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import {
  DndContext,
  closestCorners,
  useDroppable,
  useDraggable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import './listing.css';

library.add(faBars, faListCheck, faSquareCheck);

const Listing = ({ searchQuery }) => {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5255/api/Task');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  
  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find(task => task.id === active.id);
    setActiveTask(task);
  };

  //Handles drag-over events to update task statuses based on the drop location. 
  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const overStatus = over.id;
    const activeTask = tasks.find(task => task.id === active.id);

    if (activeTask.status !== overStatus) {
      const updatedTasks = tasks.map(task =>
        task.id === active.id ? { ...task, status: overStatus } : task
      );
      setTasks(updatedTasks);
    }
  };
  
  // allow updating the status in the database after the drad ends
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find(task => task.id === active.id);
    const overStatus = over.id;
    console.log({activeTask})
    console.log({overStatus})
     {
      console.log("yes");
      try {
        await axios.put(`http://localhost:5255/api/Task?id=${active.id}`, {
          ...activeTask,
          status: overStatus,
        });
        setTasks(tasks.map(task =>
          task.id === active.id ? { ...task, status: overStatus } : task
        ));
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
    setActiveTask(null);
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="app">
        <main className="app_main">
          <Task title="To Do" icon={faBars} status="To Do" searchQuery={searchQuery} tasks={tasks} setTasks={setTasks} />
          <Task title="Doing" icon={faListCheck} status="Doing" searchQuery={searchQuery} tasks={tasks} setTasks={setTasks} />
          <Task title="Done" icon={faSquareCheck} status="Done" searchQuery={searchQuery} tasks={tasks} setTasks={setTasks} />
        </main>
      </div>
      <DragOverlay>
        {activeTask ? <Taskcard {...activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Listing;
