import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faListCheck, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import './status.css'; 

library.add(faBars, faListCheck, faSquareCheck);
const TaskLists = () => {
  return (
    <div className="lists-container">
      <div className="list to-do">
       <FontAwesomeIcon icon={faBars} className="bars" />
        <h5>To Do</h5>
      </div>
      <div className="list doing">
      <FontAwesomeIcon icon={faListCheck} className="list-check" />
        <h5>Doing</h5>
      </div>
      <div className="list done">
      <FontAwesomeIcon icon={faSquareCheck} className="square-check" />
        <h5>Done</h5>
      </div>
    </div>
  );
};

export default TaskLists;
