import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faListCheck, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import Taskcard from './taskcard';
import axios from 'axios';
import './task.css';
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
import { CSS } from '@dnd-kit/utilities';

library.add(faBars, faListCheck, faSquareCheck);

const Task = ({ title, icon, status, searchQuery, tasks, setTasks }) => {
  const iconColors = {
    'To Do': 'blueviolet',
    'Doing': 'orange',
    'Done': '#197f5a',
  };
  // change the color of the icons for each list status
  const iconColor = iconColors[status] || 'black';

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: status,
  });

  return (
    <section className="task_column" ref={setDroppableRef}>
      <div className="list to-do" style={{ backgroundcolor: '#212529' }}>
        <FontAwesomeIcon icon={icon} className="task-column-icon" style={{ color: iconColor }} />
        <h5>{title}</h5>
      </div>
      <div className="task-list">
        <SortableContext
          items={tasks.filter(task => task.status === status)}
          strategy={verticalListSortingStrategy}
        >
          {tasks
            .filter((task) => task.status === status)
            .filter((task) =>
              [task.title, task.category, task.dueDate, task.estimateNumber.toString(), task.estimateUnit, task.importance]
                .some(field => field.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map((task) => (
              <DraggableTask
                key={task.id}
                task={task}
                setTasks={setTasks}
                searchQuery={searchQuery}
              />
            ))}
        </SortableContext>
      </div>
    </section>
  );
};

// Enables dragging of task items and renders a Taskcard component with specified data and search functionality.

const DraggableTask = ({ task, setTasks , searchQuery}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Taskcard {...task} searchQuery={searchQuery}/>
    </div>
  );
};

export default Task;
