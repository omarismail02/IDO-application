import React, { useState } from 'react';
import axios from 'axios';
import './taskcard.css';

const Taskcard = ({ id, title, category, dueDate, estimateNumber, estimateUnit, importance, userId, status, searchQuery }) => {
  const [editingField, setEditingField] = useState(null);
  const [newTitle, setNewTitle] = useState(title);
  const [newCategory, setNewCategory] = useState(category);
  const [newDueDate, setNewDueDate] = useState(dueDate);
  const [newEstimateNumber, setNewEstimateNumber] = useState(estimateNumber);
  const [newEstimateUnit, setNewEstimateUnit] = useState(estimateUnit);
  const [newImportance, setNewImportance] = useState(importance);
  
  // change the background of importance based on its value
  const getImportanceColor = () => {
    switch (newImportance) {
      case 'LOW':
        return '#39AC95';
      case 'MEDIUM':
        return '#FE913E';
      case 'HIGH':
        return '#DC3545';
      default:
        return 'black';
    }
  };

  // upadte the values of the task directly to the database 
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5255/api/Task?id=${id}`, {
        id,
        userId: userId,
        title: newTitle,
        category: newCategory,
        dueDate: newDueDate,
        estimateNumber: newEstimateNumber,
        estimateUnit: newEstimateUnit,
        importance: newImportance,
        status
      });

      if (response.status === 200) {
        console.log('Task updated successfully!');
      } else {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  // to allow formatting date 
  const formatDate = (date) => {
    
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };
  
  // to highlight the matched words in text input field of searching
  const getHighlightedText = (text, highlight) => {
    if (!highlight || !text) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ backgroundColor: 'orange', color: 'white' }}>{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <article className="task-card" style={{ backgroundColor: '#212529' }}>
      <h3 className="title">
        {editingField === 'title' ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.stopPropagation();
                
              }}
            }
            onBlur={() => { setEditingField(null); handleUpdate(); }}
            autoFocus
          />
        ) : (
          <span onMouseEnter={() => setEditingField('title')}>{getHighlightedText(newTitle, searchQuery)}</span>
        )}
      </h3>
      <table>
        <tbody>
          <tr>
            <td className="info">Category</td>
            <td>
              {editingField === 'category' ? (
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onBlur={() => { setEditingField(null); handleUpdate(); }}
                  autoFocus
                />
              ) : (
                <span onMouseEnter={() => setEditingField('category')}>{getHighlightedText(newCategory, searchQuery)}</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="info">DueDate</td>
            <td>
              {editingField === 'dueDate' ? (
                <input
                  type="date"
                  value={formatDate(newDueDate)}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  onBlur={() => { setEditingField(null); handleUpdate(); }}
                  autoFocus
                />
              ) : (
                <span onMouseEnter={() => setEditingField('dueDate')}>{getHighlightedText(formatDate(newDueDate), searchQuery)}</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="info">Estimate</td>
            <td>
              {editingField === 'estimate' ? (
                <>
                  <input
                    type="number"
                    value={newEstimateNumber}
                    onChange={(e) => setNewEstimateNumber(e.target.value)}
                    onBlur={() => { setEditingField(null); handleUpdate(); }}
                    autoFocus
                  />
                  <input
                    type="text"
                    value={newEstimateUnit}
                    onChange={(e) => setNewEstimateUnit(e.target.value)}
                    onBlur={() => { setEditingField(null); handleUpdate(); }}
                  />
                </>
              ) : (
                <span onMouseEnter={() => setEditingField('estimate')}>{getHighlightedText(newEstimateNumber.toString(), searchQuery)} {getHighlightedText(newEstimateUnit, searchQuery)}</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="info">Importance</td>
            <td>
              {editingField === 'importance' ? (
                <select
                  value={newImportance}
                  onChange={(e) => setNewImportance(e.target.value)}
                  onBlur={() => { setEditingField(null); handleUpdate(); }}
                  autoFocus
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              ) : (
                <span onMouseEnter={() => setEditingField('importance')} style={{ backgroundColor: getImportanceColor() }} className='importance'>
                  <span className='imp'>{getHighlightedText(newImportance, searchQuery)}</span>
                </span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  );
};

export default Taskcard;
