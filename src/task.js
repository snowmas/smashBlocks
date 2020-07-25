import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

// change task bg-color (if task is dragged)
// vertical-align: middle; align-items: center;
//  text-align: center;
const TaskContainer = styled.div`
    border: 1px solid lightgrey;
    border-radius: 5px;
    box-sizing: border-box; /* includes the padding and border in an element's total width and height.*/

    width: 40px;
    height: 40px;
  
    display: flex;
    align-items: center;
    justify-content: center;
    
    margin-right: 10px;
      /*  distance to next item */
        /* 
     align items vertically
     align items horizontally */

    background-color: ${props => (props.isDragging ? 'azure' : 'white')};

    font-size: 1rem;
`;

export default class Task extends React.Component {
    render() {
        return (
            // return this.props.task.content;
            <Draggable
                draggableId={this.props.task.id}
                index={this.props.index}>
                {(provided, snapshot) => (
                    <TaskContainer
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}>
                        {this.props.task.content}
                    </TaskContainer>
                )}
            </Draggable>
        );
    }
}
