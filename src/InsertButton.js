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


// !! PROBLEM .. does not trigger InsertSlider ... use state instead of props?
var isInserting = false; // without props, just state
const handleClick = event => {
isInserting = !isInserting; // just props, without state
  // const isInserting = !this.state.isInserting; // ! BUGGED

  console.log("isInserting: " + isInserting);
  // return alert("isInserting: " + isInserting);
return (isInserting);
};


export default class InsertButton extends React.Component {

  render() {
      return (
          // return this.props.task.content;
          <StyledButtonContainer type="button" onClick={handleClick}>Prüfen</StyledButtonContainer>
      );
  }
}

/*
function iCouldNameThisAnything() {
  // Use it like any other component.
  return <StyledButton> Überprüfen </StyledButton>;
}
*/
