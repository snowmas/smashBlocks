import React from 'react';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';

import Task from './task';

// change bg-color of column (when dragging a task around) 
const TaskList = styled.div`
 border: 1px solid grey;
  border-radius: 2px;  

  box-sizing: border-box; /* includes the padding and border in an element's total width and height.*/


 


  /** for horizontal direction (of tasks within a column) */
  /** NOT NEEDED, What is it for?
   
    flex-direction: column;
  */

  /** ? for horizontal direction (of tasks within a column)? */
  display: flex;
  align-items: center; /* align items vertically (within the container) */
  justify-content: left; /* start items from left; not needed / is default */


  padding-left: 10px; /* start first content (item) with some distance to container */

  /** NOT USED YET flex-grow: 1; */

  min-height: 60px;
  /*      min-width: 365px; transition: background-color 0.2s ease; ... use all space (minus 10px from padding-left) from super container draggablecontext in index.js */
  

  background-color: ${props => (props.isDraggingOver ? 'grey' : 'lightgrey')};
 

/* flex-wrap: wrap; ... replaced by: flex-direction: column; ... wraps areas to next line (if not enough space) */
    /*  WORKS, NOT NEED IF flex 0 1 auto is used? (bottom) alignment along main axis; items are packed toward the end of the flex-direction. */
  /* justify-content: flex-end; 
  align-content: flex-end; (right) how flex items are laid out along the cross axis !! DOES NOT WORK IF is wrapped !!!  */


`;

export default class Column extends React.Component {
  render() {
    // return this.props.column.title;
    return (
 
        <Droppable droppableId={this.props.column.id} direction="horizontal">  
          {(provided, snapshot) =>    // unclear if after arrow function the () is needed
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>

          }
        </Droppable>

    );
  }
}