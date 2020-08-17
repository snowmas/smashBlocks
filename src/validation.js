


// ---- MY CODE ----
const mathsteps = require("mathsteps");
// const Algebrite = require("algebrite");

/*
const leftNode = "x + y + 5";
const opEquals = " = ";
const rightNode = "55";

const equation = leftNode + opEquals + rightNode;
*/


const validate = function val(eq) {
  const equation = eq;


  /** 
  // SIMPLIFY EXPRESSION ... not clear what it does
  // const steps = mathsteps.simplifyExpression("x + x + 5 = 55");
 
 const steps = mathsteps.simplifyExpression(equation);

  console.log("SiMPLIFYEXPRESSION");
  steps.forEach(step => {
    console.log("before change: " + step.oldNode.toString());
    console.log("change: " + step.changeType);
    console.log("number of substeps: " + step.substeps.length);
    console.log("after change: " + step.newNode.toString());
    console.log("----- next step -------");
  });
*/

  // msResult
  // should store last step of solveQuation, e.g. x = 50
  // return this variable to process in app.js and check for the 50
  // if expected value, set boolean true and validation result to true
  // and tell the user the solution is coreect
  var msResult = "";  

  // SOLVE EQUATION in use
  const steps = mathsteps.solveEquation(equation);

  console.log("VALIDATION: --- SOLVEEQUATION ---: equation: " + equation);
  steps.forEach(step => {
    //console.log("before change: " + step.oldEquation.ascii());
    console.log(
      step.newEquation.ascii() + "            | operation: " + step.changeType
    );
    msResult = step.newEquation.ascii();
    
  });
  return msResult;

  /** 
  console.log("SOLVEEQUATION");
  steps.forEach(step => {
    console.log("before change: " + step.oldEquation.ascii());
    console.log("change: " + step.changeType);
    console.log("number of substeps: " + step.substeps.length);
    console.log("after change: " + step.newEquation.ascii());
    console.log("----- next step -------");
  });
  */

  // ALGEBRITE TESTING
  // var test10 = Algebrite.eval("x + x + 5").toString(); // => "1/3 x^3"
  // SYNTAX ERROR IF equation problematic ... var test10 = Algebrite.eval(equation).toString(); // => "1/3 x^3"
  // console.log("algebrite: " + test10);

  // ALGEBRITE END

  // --- END OF MY CODE -----


 
}

export default validate;
