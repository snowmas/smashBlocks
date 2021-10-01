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
import InsertButton from './InsertButton';


/* ---------------- LOGGING --------------------------- */

console.data = function(msg) {
  console.log(" % c % s % s % s", "color: yellow; background - color: black;", "–", msg, "–");
}

console.important = function(msg) {
  console.log(" % c % s % s % s", "color: brown; font - weight: bold; text - decoration: underline;", "–", msg, "–");
}

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
        console.log("INDEX: validateNow(): PRINT STATE: current equation: tasks: " + JSON.stringify(tasksX));

        
        // SOLVE: run mathsteps ... and get the solved result
        const msResult = validate(tasksX);   // run validation and print to console
        console.log("INDEX: validateNow(): validate() result: msResult: " + msResult);

       // SYNTAX CHECK ... TODO: rudimentary implementation 
        var isSyntaxCorrect = (msResult === "" ? false : true); // empty -> false; not empty -> true
        console.log("INDEX: validateNow(): isSyntaxCorrect: " + isSyntaxCorrect.toString());

        // SOLUTION CHECK ... COMPARE: check if users equation is correct
        // -> compare mathsteps result with hardcoed result 
        // var isSolutionCorrect = (msResult === ("x = 25"));
        // DOES NOT WORK FOR 30 ... var isSolutionCorrect = (msResult.localeCompare("x = 25" || "x = 30") ); // NOT WORKING CORRECTLY
        // DOES NOT WORK AT ALL var isSolutionCorrect = (msResult === ("x = 25") || ("x = 30") ); 
        var isSolutionCorrect = false;
        if (msResult === "x = 25") { isSolutionCorrect = true; }
        if (msResult === "x = 30") { isSolutionCorrect = true; }
        console.log("INDEX: validateNow(): isSolutionCorrect: " + isSolutionCorrect.toString());

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
  
  console.log("INDEX: ValidationFeedback: props.isSolutionCorrect: " + props.isSolutionCorrect);

  var validation_feedback = SOLUTION_WRONG;
  if (props.isSyntaxCorrect) {
    validation_feedback = SYNTAX_CORRECT;
  } 
  if (props.isSolutionCorrect) {
    validation_feedback = SOLUTION_CORRECT;
  }
  // props.isSyntaxCorrect ? SYNTAX_CORRECT : SOLUTION_WRONG;
  // const validation_feedback = props.isSolutionCorrect ? SOLUTION_CORRECT : SOLUTION_WRONG;
  console.log("INDEX: ValidationFeedback: validation_feedback: " + validation_feedback);

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
        console.log("INDEX: onDragEnd(): --------- dragging ------------");
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

          console.log("INDEX: onDragEnd(): --------- finished dragging (within row) ------------");

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

        // TODO ?? MAKE THIS WORK FOR ALL TASK MOVMENTS, NOT JUST #4
        // MOVED, NOT NEEDED ANYMORE
        // this.setState({ initialState: this.state });

        console.log("INDEX: onDragEnd(): --------- finished dragging (to other row) ------------");

    };


    
      
    
    // update variables with slider value, while dragging slider, if "Prüfen" is activated
    handleSliderChange = sliderValue => {
      console.log("INDEX: handleSliderChange(): sliderValue: " + sliderValue);

      // remember which tasks contained an "x", 
      // because the current state will be overwritten with the slider value multiple times 
      

      var initialState = this.state.initialState;
/*
      if (initialState == null) {
        this.setState({ initialState: this.state });
        console.log("INITIALSTATE was null");
        console.log("+++ INITIALSTATE: " + JSON.stringify(initialState, null, 2));
      } else {
        console.log("INITIALSTATE WAS SET");
        console.log("+++ INITIALSTATE: " + JSON.stringify(initialState, null, 2));
      }
     */
      

      

      // --- 1. GET THE TASKIDS THAT I NEED from the current state-----

      var currentState = this.state;

      var column1 = currentState.columns['column-1']; // .taskIds DOES NOT WORK, WHY?
      console.log("--- COLUMN1: " + JSON.stringify(column1)); // works {"id":"column-1","taskIds":["task-1","task-3"]}
      var taskIds = column1.taskIds;
      console.log("--- TASKIDS: " + JSON.stringify(taskIds)); // ["task-1","task-3"] 


      // DEBUG: Show my each taskId from the taskIds of currentState (to make sure they are read correctly)
      taskIds.map(taskId => {
        console.log("--- DEBUG TASKid: " + taskId); // works: task-1      task-3
        return taskId; // NEEDED in arrow function; BUT NOT USED ??
      });

      console.table(taskIds);
      
      // DEBUG: Show my each content of the taskId from the taskIds of currentState (to make sure they are read correctly)
      taskIds.map(taskId => {
        var taskTempContent = this.state.tasks[taskId].content;
        console.log("+++ DEBUG TASKTEMPCONTENT: " + JSON.stringify(taskTempContent));
        return taskId; // NEEDED in arrow function; BUT NOT USED ??
      });

      

      // --- 2. LOOK IN ALL TASKS - for these tasks -----
      var newState = null;

      // WORKS AND CAN MATCH ... BUT HOW TO ACCESS .content and replace it ??
      taskIds.map(taskId => {
        // var taskContent = initialState.tasks[taskId].content; // ORIGINAL version which produces initialState ... null ERROR
        var taskContent = this.state.tasks[taskId].content;   // ISSUE: WORKS WITHOUT ERROR - but after 2nd commited, it does not updates&reset the x (value)
        console.log("+++ cur TASKCONTENT: " + JSON.stringify(taskContent));

        // TODO: replace only where content is "x"
        // WORKS BUT ONLY THE FIRST TIME; Further: x -> 16 -> no replacement
          // REMEMBER INITIAL STATE and reset to x
          // END WITH PRÜFEN ENDE (works?)
         if (taskContent === "x") {

          const newTask = {
            ...currentState.tasks[taskId],
            // content: sliderValue,     // ! update task content with current slider value (content is treated as string, sliderValue as variable)
            content: JSON.stringify(sliderValue, null, 2),     // ! update task content with current slider value (content is treated as string, sliderValue as variable)
          };
          console.log("+++ found x! NEWTASK: " + JSON.stringify(newTask));
  
          // TODO: REPLACE EXISTING TASK, not just add a new one with same id
  
          // combine all tasks that should be updated into 1 setState()? outside of map
          newState = {
            ...this.state,  // replace with currentState?
            tasks: {
            ...this.state.tasks,
              [taskId]: newTask,
            },
          };
          // log whole state
          console.log("+++ NEWSTATE: " + JSON.stringify(newState, null, 2));

// ?rem? TEMP 14.05.         this.setState(newState);    // update state with new order of items
      
           
         } else {
            console.log("INDEX REPLACE: else: did not replace: " + taskId);
            
            // TRIES
            // Removed because .. i don't know, maybe put it in again
 // add 14.05.     
            newState = this.state;
         }

           
          // TODO PUT THIS OUTSIDE OF the map function for performance;
          // but need to bundle all newTask 's into one update; 
          // else just the last one will be updated
          // TRIES outside of if/else
 // add TEMP 14.05.      
          this.setState(newState);    // update state with new order of items
  

  
        return taskId; // REFACTOR: NEEDED in arrow function; BUT NOT USED ??
      });

      
  
          
        // REPLACE
        // var tasksStringified = JSON.stringify(tasks);
        // tasksStringified = tasksStringified.replace('"content": "x"', '"content": "a"');
        

 

      // TODO: setState (with new tasks)
    }

    // INSERTBUTTON
    // Function to set the parent's state
    handleInsertChange = isInserting => {
      console.log("INDEX: handleInsertChange(): before isInserting: " + isInserting);
      // var reversedInsert = !isInserting;
     isInserting = !isInserting;
      console.log("INDEX: handleInsertChange(): after isInserting: " + isInserting);
      
      // UPDATE ISINSERTING: switch the boolean when "Prüfen" is clicked
      // this.setState({ isInserting: isInserting });
      console.log("INDEX: handleInsertChange(): before setState() isInserting: " + this.state.isInserting);
      this.setState((state, isInserting) => ({
          // isInserting: isInserting // has the [object Object] problem?
        isInserting: !state.isInserting, // can remove the isInserting stuff above?
        
      }));
      // not correct? why? setState done asynchronously? or smthg else?
      console.log("INDEX: handleInsertChange(): state.isInserting: " + this.state.isInserting);


      // SAVE INITIAL STATE for handleSliderChange
      // for updating task content, if slider is moved
      // remember current state, so thtat it can be reverted onChangeCommitted
      // TODO: make this more robust
       if (isInserting) {
      // if (this.state.initialState == null) {
        // this.setState({ initialState: this.state });
        this.setState((state) => ({
          initialState: state
        }));
       
        console.log("+++ this.state: " + JSON.stringify(this.state, null, 2));
        console.log("SAVED INITIALSTATE SNAPSHOT");
      }
      
      // UPDATE ITEMS/TASKS labels if isInserting
 /*     
      // only if isInserting
      if (isInserting) {
        
        // First: get areaSpace ... either from state or pros
        const areaSpace = this.state.areaSpace;

        // Second: get items of column 1
        const columnId = 1;
        
        // TODO only if column 1 is not empty
        // iterate through tasks and look for "x" value; 
        // replace each "x" with areaChange
        const column = this.state.columns[columnId];
        const newTasks = column.taskIds.map(taskId => 
          // this.state.tasks[taskId];
          if (this.state.tasks[taskId].contains("x")) {
            this.state.tasks[taskId].replace(areaSpace);
          } else {
            this.state.tasks[taskId];
          }
        );
        // setState( ... newTasks)
      

    
      
        // // return column.title;
        //  return <Column key={column.id} column={column} tasks={tasks} />;
      } else if (!isInserting) {
        // replace the current with the original
      } else {
        console.log("INDEX: WARNING!!! - SHOULD NEVER HAPPEN");
      }
*/
      // if isInserting (better: dragging) update tasks with content "x" to current slider value
    }


    handleSliderChangeCommitted = initialTaskValues =>  {
      console.log("HANDLESLIDERCHANGECOMMITED: trying to reset initialState, get ready ...");
      
      // take from current state the remembered original state from initialState and write initialState into current state
      const initialStateUpdated = this.state.initialState;  // ADDED TRYING TO FIX A PROBLEM with intialState is null
      console.log("HANDLESLIDERCHANGECOMMITED: this should be the origianl initialState " + JSON.stringify(initialStateUpdated, null, 2));
      
      // USED SOFFAR this.setState(this.state.initialState);  // revert state to state with initial values after slider use
      this.setState(initialStateUpdated);  // revert state to state with initial values after slider use


      // DEBUG: check if current State is really the original initialState
      console.log("HANDLESLIDERCHANGECOMMITED: this is the new state and should be the origianl initialState " + JSON.stringify(this.state, null, 2));

      // this.setState({ initialState: null }); // reset after slider use
      console.log("HANDLESLIDERCHANGECOMMITED: reset initialState ... at least tried - END");
      
    }

    render() {
      // console.log("getWindowDimentions(): " + JSON.stringify(getWindowDimensions()) );
      
      // DEBUG: NOT NEEDED ANYMORE
      // console.log("LOG isEqSyntaxCorrect: " + this.state.isEqSyntaxCorrect.toString()); // TODO: updates 1 run too late!
      // console.log("LOG isEqSolutionCorrect: " + this.state.isEqSolutionCorrect.toString()); // TODO: updates 1 run too late!
      
      console.log("INDEX: render(): ------- RENDER-START ------------- ");


      // SLIDER
      const { propertyType, areaSpace, designStyle } = this.state;
      console.log("INDEX: render(): this.state default: areaSpace: " + areaSpace);
      const values = { propertyType, areaSpace, designStyle }; // for InsertSlider
    

      // INSERTBUTTON
      // const { isInserting } = this.state;
      console.log("INDEX: render(): this.state default: isInserting: " + this.state.isInserting);
   
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
              <InsertButton isInserting={this.state.isInserting} onInsertChange={this.handleInsertChange}></InsertButton>
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
            { // InsertSlider => isInserting  ? display InsertSlider : not
              
              <InsertSlider 
                values={values} 
                onSliderChange={this.handleSliderChange} // pass the index: onSliderChange function as prop to InsertSlider; there InsertSlider updates in handleSliderChange? the prop sliderValue, which can be used in index to update labels in tasks 
                onSliderChangeCommited={this.handleSliderChangeCommitted}
                style={{marginTop: '20px', marginBottom: '20px'}}
                isInserting={this.state.isInserting} 
              />
              
            }
       
            </Container>
        </DragDropContext>
      )
    }
  }

// Put the things into the DOM!
ReactDOM.render(<App />, document.getElementById('root'));
