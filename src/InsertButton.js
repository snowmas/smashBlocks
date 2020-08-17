import React from 'react';
import styled from "styled-components";

// Styled component named StyledButton
const StyledButtonContainer = styled.button`
  background-color: grey;
  font-size: 1rem;
  color: white;
  
  height: 40px;
  align-content: center;
  min-width: 80px;      /* override width, to give button a minimum size */
  width: fit-content;   /* fit button width to text amount*/
`;

/*
// !! PROBLEM .. does not trigger InsertSlider ... use state instead of props?
var isInserting = false; // without props, just state
const handleClick = event => {
isInserting = !isInserting; // just props, without state
  // const isInserting = !this.state.isInserting; // ! BUGGED

  console.log("isInserting: " + isInserting);
  // return alert("isInserting: " + isInserting);
return (isInserting);
};
*/





export default class InsertButton extends React.Component {

/*
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    // this.state = {color: 'red'};
  }
*/

  // !! PROBLEM .. does not trigger InsertSlider ... use state instead of props?
  // var isInserting = false; // without props, just state
  // handleClick = (event) => {

  handleClick = (event) => {
  // console.log("INSERTBUTTON handleClick() - props.isInserting before: " + this.props.isInserting);
  // var isInserting = this.props.isInserting;
  console.log("INSERTBUTTON: handleClick() - isInserting before: " + this.props.isInserting);
   // isInserting = !isInserting;
    var isInserting = this.props.isInserting;
    console.log("INSERTBUTTON: handleClick() - isInserting after: " + isInserting);
    
    // this.setState({ isInserting: isInserting});
    this.props.onInsertChange(isInserting);
    // props.setChanged();
    
    // console.log("INSERTBUTTON handleClick() - state.isInserting: " + this.state.isInserting);
    // return alert("isInserting: " + isInserting);
    // return (isInserting);
  };


  render() {
      console.log("INSERTBUTTON: render(): this.props: isInserting: " + this.props.isInserting);
      return (
          // return this.props.task.content;
          // WAS BEFORE onClick={{this.handleClick}}
          <StyledButtonContainer type="button" onClick={this.handleClick} >Prüfen</StyledButtonContainer>
      );
  }
}

/*
function iCouldNameThisAnything() {
  // Use it like any other component.
  return <StyledButton> Überprüfen </StyledButton>;
}
*/
