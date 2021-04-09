// declaring variables
// first res to display ongoing calculation
const firstRes = document.getElementById('first-disp');
// sec res to display number values selected for calculation
const secRes = document.getElementById('sec-disp');
// temp res to display result of calculation
const tempRes = document.getElementById('temp-res');
// all operators(X, /, -, +)
const operatorSign = document.querySelectorAll('#operator');
// all numbers(1,2,3,4,5,6,7,8,9,0)
const numKey = document.querySelectorAll('#nums');
// clear(CE)
const clears = document.getElementById('clear')
// clear all(C)
const clearAll = document.getElementById('clear-all')
// equal to(=)
const equalTo = document.getElementById('equal')

// initialize variables
// disp1 to hold ongoing calculation
let disp1 = '';
// disp2 to hold number values selected for calculation
let disp2 = '';
// results to hold result of calculation
let results = null;
// lastOper to hold last operator
let lastOper = '';
// dotPresent to prevent a client from inputing more than one decimal point
let dotPresent = false;
// functn checkDot
const checkDot = (e) =>{
// check if a decimal point already exist, if not add decimal pt
    if(e.target.innerText === '.' && !dotPresent){
        dotPresent = true;
    } 
    // if it exist, prevent user from inputing another decimal point
    else if(e.target.innerText === '.' && dotPresent){
        return
    }
    // update disp2 with the numbers selected by the user
    disp2 += e.target.innerText
    // innertext showing contents in disp2
    secRes.innerText = disp2
}

// click event listener on each numberkey
numKey.forEach((num)=>{
    // call checkDot function on click
    num.addEventListener('click', checkDot)
})

// click event listener for operators
operatorSign.forEach((operators)=>{
    operators.addEventListener('click', (e)=>{
        // if no number value, return
        if(!disp2){
            return
        } 
        // set dotPresent to false to allow user input decimal pt
        dotPresent = false;
        // store selected operator in a currOper variable
        const currOper = e.target.innerText;
        // if there are values in disp1, disp2 & lastOper
        if(disp1 && disp2 && lastOper){
        // call mathOper to do the calculation
        mathOper();
        }
        // if not results is set to value in disp2
        else{
            results = parseFloat(disp2);
        }
        // call clearCal function to update app
        clearCal(currOper)
        // update lastOper
        lastOper = currOper;
    })
})

// clearCal funct
const clearCal = (oper = '')=>{
// set disp1 to show value in disp2 and ongoing calculation
disp1 += parseFloat(disp2) + "" + oper + "";

// clear inn
secRes.innerText = ' '
// clear values in disp2 to accomodate new val for calc
disp2 = '';
// display contents in disp1
firstRes.innerText = disp1;
// display result
tempRes.innerText = results;

}


// mathOper

const mathOper = () => {
    switch(lastOper){
        // if X  then multiply
        case 'X': results = parseFloat(results)  * parseFloat(disp2);
        break;
        // if / then divide
        case '/': results = parseFloat(results)  / parseFloat(disp2);
        break;
        // if + then add
        case '+': results = parseFloat(results)  + parseFloat(disp2);
        break;
        // if - then subtract
        case '-': results = parseFloat(results)  - parseFloat(disp2);
        break;
        // if Modulus (division remainder)
        case '%': results = parseFloat(results)  % parseFloat(disp2);
        break;
    }
}

// clear all function
clearAll.addEventListener('click', ()=>{
  if(!disp1 && !disp2 && !results){
      return
  } 
  disp2 = '';
  secRes.innerText = '0'
  disp1 = '';
  firstRes.innerText = '0';
  results = '';
  tempRes.innerText = '0';
    
})

// clear last history
clears.addEventListener('click', ()=>{
    secRes.innerText = "";
    disp2 = "";
})

// equal to func
equalTo.addEventListener('click', () => {
    // if no val for disp1 and 2 then return
    if(!disp1 || !disp2){
        return
    }
    dotPresent = false;
    // call functions
    mathOper();
    clearCal();
  tempRes.innerText = '';
//   let disp2 hold current result
  disp2 = results;
//   let disp2 display current result
  secRes.innerText = disp2;
  disp1 = '';
})