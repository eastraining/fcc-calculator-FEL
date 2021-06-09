import React from "react";
import "./App.css";

const digits = new Map([
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["zero", 0],
  ["decimal", "."]
]);

const operators = new Map([
  ["clear", "AC"],
  ["backspc", "C"],
  ["add", "+"],
  ["subtract", "-"],
  ["multiply", "×"],
  ["divide", "÷"],
  ["equals", "="]
]);

function Display(props) {
  return (
    <div id="display-panel">
      <p id="equation-display">
        {props.values.join("")}
      </p>
      <p id="display">
        {props.display}
      </p>
    </div>
  );
}

function Button(props) {
  return (
    <div className="button" id={props.uniqueId} onClick={props.handleClick}>
      {props.content}
    </div>
  );
}

function ButtonGrid(props) {
  const valLen = props.display.length;
  const previousVal = props.display[valLen - 1];

  const handleClick = (e) => {
    const buttonId = e.target.id;
    if (digits.has(buttonId)) {
      handleDigit(digits.get(buttonId));
    } else {
      handleOperator(operators.get(buttonId));
    }
  }

  const handleDigit = (digit) => {
    if (props.values.includes("=")) {
      props.setDisplay("0");
      props.setValues([]);
    }

    if ((/[^0-9\\.]/).test(props.display)) {
      if (props.display.length === 1) {
        props.setValues([...props.values, props.display]);
      } else {
        props.setValues([...props.values, props.display[0], props.display[1]]);
      }
      if (digit === ".") {
        props.setDisplay("0.");
      } else {
        props.setDisplay(String(digit));
      }
    } else if (digit === ".") {
      if (!(/[\\.]/.test(props.display))) {
        props.setDisplay(props.display + digit);
      }
    } else if (previousVal !== "0") {
      props.setDisplay(props.display + String(digit));
    } else if (digit !== 0) {
      if (valLen === 1) {
        props.setDisplay(String(digit));
      } else {
        props.setDisplay(props.display + String(digit));
      }
    } else if (valLen !== 1 && (typeof props.display[valLen - 2] === "number" || props.display[valLen - 2] === ".")) {
      props.setDisplay(props.display + String(digit));
    } 
  }

  const handleOperator = (operator) => {
    if (operator === "=") {
      // TODO
      if (props.values.includes("=")) {
        return;
      }

      let calcArr;
      let resArr;
      if ((/[\d]/).test(props.display)) {
        resArr = [...props.values, props.display];
        calcArr = resArr.slice();
      } else {
        resArr = props.values.slice();
        calcArr = resArr.slice();
      }
      let result = 0;
      while (resArr.includes('×') || resArr.includes('÷')) {
        let pivot = resArr.indexOf('×') !== -1 ? 
        resArr.indexOf('÷') !== - 1 ?
        resArr.indexOf('×') < resArr.indexOf('÷') ?
        resArr.indexOf('×') : resArr.indexOf('÷')
        : resArr.indexOf('×')
        : resArr.indexOf('÷');
        
      }
      return;
    } 

    if (props.values.includes("=")) {
      props.setValues([props.display]);
    }
    
    if (operator === "AC") {
      props.setDisplay("0");
      props.setValues([]);
    } else if (operator === "C") {
      props.setDisplay("");
    } else {
      if ((/[^0-9\\.]/).test(props.display)) {
        if (operator === "-") {
          if (props.display.length === 1) {
            props.setDisplay(props.display + operator);
          } else {
            return;
          }           
        } else {
          props.setDisplay(operator);
        }
      } else {
        props.setValues([...props.values, props.display]);
        props.setDisplay(operator);
      }
    }
  }
  
  const buttonIterator = (arr) => {
    return arr.map(subArr => {
      return <Button key={subArr[0]} uniqueId={subArr[0]} content={subArr[1]} handleClick={handleClick} />
    })
  }

  return (
    <div className="button-grid">
      {buttonIterator(Array.from(operators))}
      {buttonIterator(Array.from(digits))}
    </div>
  );
}

function App() {
  const [display, setDisplay] = React.useState("0");
  const [values, setValues] = React.useState([]);

  return (
    <div className="App">
      <Display display={display} values={values} />
      <ButtonGrid display={display} setDisplay={setDisplay} values={values} setValues={setValues} />
    </div>
  );
}

export default App;
