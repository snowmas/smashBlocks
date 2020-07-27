import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

// import styled from "styled-components"; // ADDED (to style <Box>)
import initialData from './initial-data';
import Column from './column';
import '@atlaskit/css-reset';

import validate from "./validation";  // import my function to validate an equation

import InsertSlider from './InsertSlider';

/* ----------------------------------------------- */

/* NOT IN USE
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
*/

// Prevents bounce on mobile browsers(when scrolling beyond top or bottom)  
window.addEventListener('touchmove', function (event) {
  event.preventDefault()
}, {passive: false})


const Container = styled.div`
 /* align-content: flex-end; (right) how flex items are laid out along the cross axis !! DOES NOT WORK IF is wrapped !!!  */
   /* max-width: 375px; ... forces wrap (on wide screens, by limiting width */

  display: flex;
  flex-direction: column;
  justify-content: flex-end; 

  height: 100%;
  width: 100%;
  max-width: 640px;   /* TODO: define for Desktop */

  background-color: white;

  /* POSITION AT BOTTOM (of screen) (fills remaining space) */
   /* (top->bottom), main-axis,  direction of flex items placement in flex container */  
   /*  WORKS, NOT NEED IF flex 0 1 auto is used? (bottom) alignment along main axis; items are packed toward the end of the flex-direction. */
 `

const Viz = styled.div`
  flex: 10 1 auto; /* (fills remaining space) ...  */
  padding: 20px;

  font-size: 1rem;
`


const Validation = styled.div`
  flex: 1 1 auto; /* (fills remaining space) ...  */
  /*  TRY: color: rgba(0, 0, 0, 0.5) */
  background-color: ${prop => prop.bgColor ? '#F1FDE3' : 'white'}; 
  padding: 20px;
  font-size: 1rem;
`


// const ValidationSyntax = styled.div`
//  flex: 1 1 auto; /* (fills remaining space) ...  */
//  background-color: ${prop => prop.bgColor ? 'lightgreen' : 'white'};   
// `



const Math = styled.div`
  flex: 1 0 auto;  /* dont grow, dont shrink, sized to content ... had it at: 0 1 200px; then 0 1 auto */
  
  /* background-color: lightblue; */
 
`

// Validate equation row
function validateNow(newState) {
        // ------- VALIDATON -----------------

        // WHICH EQUATION: which COLUMN gets validated
        // const column2 = this.state.columns['column-1'];
        const column2 = newState.columns['column-1'];
        
        // #1 WORKS but separated ...
        //  const tasksX = column2.taskIds.map(taskId => this.state.tasks[taskId].content); // WORKS, but ...
        
        // #2 WORKS but separated
        // const myList = [];
        // const tasksX = myList.concat(column2.taskIds.map(taskId => this.state.tasks[taskId].content));

        // GET EQUATION: this is the USERS EQUATION
        const tasksX = column2.taskIds.map(taskId => newState.tasks[taskId].content).join(''); // WORKS, but ...
        console.log("PRINT STATE task content: " + JSON.stringify(tasksX));

        
        // SOLVE: run mathsteps ... and get the solved result
        const msResult = validate(tasksX);   // run validation and print to console
        console.log("LOG msResult: " + msResult);

       // SYNTAX CHECK ... TODO: rudimentary implementation 
        var isSyntaxCorrect = (msResult === "" ? false : true); // empty -> false; not empty -> true
        console.log("LOG isSyntaxCorrect: " + isSyntaxCorrect.toString());

        // SOLUTION CHECK ... COMPARE: check if users equation is correct
        // -> compare mathsteps result with hardcoed result 
        // var isSolutionCorrect = (msResult === ("x = 25"));
        // DOES NOT WORK FOR 30 ... var isSolutionCorrect = (msResult.localeCompare("x = 25" || "x = 30") ); // NOT WORKING CORRECTLY
        // DOES NOT WORK AT ALL var isSolutionCorrect = (msResult === ("x = 25") || ("x = 30") ); 
        var isSolutionCorrect = false;
        if (msResult === "x = 25") { isSolutionCorrect = true; }
        if (msResult === "x = 30") { isSolutionCorrect = true; }
        console.log("LOG isSolutionCorrect: " + isSolutionCorrect.toString());

        // UPDATE: show the user if his equation correct
        // -> update variable which gets display to user
        // this.setState({isEqSolutionCorrect: check});

        const newNewState = {
          // make sure all other state entries stay there
          ...newState,   
          columns: {
            ...newState.columns,
           // [newStart.id]: newStart,
            // [newFinish.id]: newFinish,
          },    
          isEqSolutionCorrect: isSolutionCorrect,    // change state again with validation result isCorrect
          isEqSyntaxCorrect: isSyntaxCorrect
        };
              
  return newNewState;
}
   
// const SOL_WRONG = "❓";  
// const SOL_CORRECT = '😍';


function ValidationFeedback(props) {
  const SOLUTION_WRONG = "❓"; 
  const SOLUTION_CORRECT = '😍';
  const SYNTAX_CORRECT = '🌱';
  
  console.log("LOG VFC COMPONENT - props.isSolutionCorrect: " + props.isSolutionCorrect);

  var validation_feedback = SOLUTION_WRONG;
  if (props.isSyntaxCorrect) {
    validation_feedback = SYNTAX_CORRECT;
  } 
  if (props.isSolutionCorrect) {
    validation_feedback = SOLUTION_CORRECT;
  }
  // props.isSyntaxCorrect ? SYNTAX_CORRECT : SOLUTION_WRONG;
  // const validation_feedback = props.isSolutionCorrect ? SOLUTION_CORRECT : SOLUTION_WRONG;
  console.log("LOG VFC COMPONENT - validation_feedback: " + validation_feedback);

  return validation_feedback;
}

class ValidationFeedbackContainer extends Component {
 
/*
  constructor(props) {
    super(props);
   
  }
*/

  // NEVER USED
    // const SOLUTION_CORRECT = '😍';

    // prop => prop.isSolutionCorrect
    // prop => prop.isSyntaxCorrect
    
    // const validation_feedback = SOLUTION_WRONG;

  render() {
    
    return (

      <ValidationFeedback 
        isSolutionCorrect={this.props.isSolutionCorrect} 
        isSyntaxCorrect={this.props.isSyntaxCorrect}
      >
        test {this.validation_feedback} 
      </ValidationFeedback>


    );
  }
}

/*
const ValidationFeedback = styled.div`
  font-size: 1rem;
`
*/



   
   // console.log("LOG " + SOLUTION_WRONG + " " + SOLUTION_CORRECT);

class App extends Component {
    state = initialData;

    onDragEnd = result => {
        document.body.style.color = 'inherit';
        document.body.style.backgroundColor = 'inherit';
      
        const {destination, source, draggableId } = result;

        // #1 OUTSIDE: if dropped outside of boundary (put back to source position) ?
        if(!destination) {
          return;   // do nothing
        }
      
        // #2 SAME: if dropped on same spot ?
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
          return;   // do nothing
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];
     
        // #3 SAME ROW: if dropped within same column ?
        if(start === finish) {
          const newTaskIds = Array.from(start.taskIds);
          newTaskIds.splice(source.index, 1);
          newTaskIds.splice(destination.index, 0, draggableId);
        
          const newColumn = {
            ...finish,
            taskIds: newTaskIds,
          };
  
          const newState = {
            ...this.state,
            columns: {
              ...this.state.columns,
              [newColumn.id]: newColumn,
            },
          };
        
          this.setState(newState);    // update state with new order of items

          // ------- VALIDATON -----------------
          const newNewState = validateNow(newState);    // validate the new state with mathsteps
          this.setState(newNewState);   // update state
          // ------- END of VALIDATON -----------------

          return;  
        }

        // #4 OTHER ROW: Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
          ...start,
          taskIds: startTaskIds,
        };
        
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
          ...finish,
          taskIds: finishTaskIds,
        };
    
        const newState = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          },     
        };
        this.setState(newState);

        // ------- VALIDATON -----------------
        const newNewState = validateNow(newState);    // validate the new state with mathsteps
        this.setState(newNewState);   // update state
        // ------- END of VALIDATON -----------------

    };


    // SLIDER
    // Handle inputs change
    handleChange = input => event => {
      this.setState({ [input]: event.target.value });
    }

    render() {
      // console.log("getWindowDimentions(): " + JSON.stringify(getWindowDimensions()) );
      
      // DEBUG: NOT NEEDED ANYMORE
      // console.log("LOG isEqSyntaxCorrect: " + this.state.isEqSyntaxCorrect.toString()); // TODO: updates 1 run too late!
      // console.log("LOG isEqSolutionCorrect: " + this.state.isEqSolutionCorrect.toString()); // TODO: updates 1 run too late!
      
      // SLIDER
      const { propertyType, areaSpace, designStyle } = this.state;
      const values = { propertyType, areaSpace, designStyle };
      // const { values, handleChange } = this.props; // for Slider
      const { handleChange } = this.props;

      return (
        <DragDropContext onDragEnd={this.onDragEnd}>   
            <Container>
              <Viz>Die Hunde Sammy und Carla wiegen zusammen 55kg. Carla wiegt um 5kg mehr als Sammy.
                <br /><br /> Wie schwer sind die Hunde?
              </Viz>
              { // TODO: put into Validation tag: isCorrectSolution={isCorrect}, isCorrectSyntax={isCorrectSyntax}
               // <ValidationSyntax bgColor={this.state.isEqSyntaxCorrect}>Gültige Gleichung: {this.state.isEqSyntaxCorrect.toString()} </ValidationSyntax>  
               // Validation: {this.state.isEqSolutionCorrect.toString()}
              }
              <Validation bgColor={this.state.isEqSolutionCorrect}>
                Korrekte Lösung:  {//this.state.isEqSolutionCorrect ? SOL_CORRECT : SOL_WRONG
                } 
                <ValidationFeedbackContainer 
                  isSolutionCorrect={this.state.isEqSolutionCorrect} 
                  isSyntaxCorrect={this.state.isEqSyntaxCorrect}
                >
                </ValidationFeedbackContainer>
              </Validation> 
              <Math>
                  { 
                      this.state.columnOrder.map((columnId) => {
                          const column = this.state.columns[columnId];
                          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
                          
                        // return column.title;
                          return <Column key={column.id} column={column} tasks={tasks} />;
                      })
                  }
              </Math>
            {  /*
              <InsertSlider 
                values={values} 
                handleChange={handleChange} 
                style={{marginTop: '20px', marginBottom: '20px'}} 
              />
              */
            }
       
            </Container>
        </DragDropContext>
      )
    }
  }

// Put the things into the DOM!
ReactDOM.render(<App />, document.getElementById('root'));
