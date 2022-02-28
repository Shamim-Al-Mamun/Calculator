const currentValue = document.querySelector('.currentInput');
const result = document.querySelector('.result');
const input = document.getElementsByClassName('input')[4];
const decimal = input.getElementsByTagName('button')[2];
const backSpace = document.getElementsByClassName('backspace');
const backIcon = backSpace[0];

var temp = "";
var log = "";
var ans = "";
var len = 15;

//Initially disable back button
backIcon.disabled = true;
backIcon.style.opacity = ".4";

function handleInput(value){
    //Handling previous state values
    backIcon.style.opacity = "1";
    backIcon.disabled = false;
    currentValue.style.fontSize= "1.5rem"
    result.style.color ="black";

    //Enable decimal button
    if(isNaN(value)){
        decimal.disabled =false;
    }


    //input  operator after bracket
    if(isNaN(value)  && temp.length > 0){
         if((temp[temp.length-1]=== ")") || (temp[temp.length-1]=== "(")){
            temp += value;
            currentValue.innerHTML = temp;
        }
        //Input last operator between two consecutive different operator input
        else if(!(temp[temp.length-1]=== ")") || !(temp[temp.length-1]=== "(")){
                if(!(temp[temp.length-1] === value)){
                    if(isNaN(value) && isNaN(temp[temp.length-1]) && !(temp[temp.length-1] === value)){
                    var validInput = temp.substring(0, temp.length-1);
                    temp = (validInput + value);
                    currentValue.innerHTML = temp;  
                }
                //Input one operator between two consecutive same operator input
                else if(!(isNaN(value) && isNaN(temp[temp.length-1]) && !(temp[temp.length-1] === value))){
                    temp += value;
                    currentValue.innerHTML = temp;  
                }
            }
        }
    }
    //Number input
    //Setting rules for zero entry
    else{
        if(value =="0"){
            if(!temp ){
            console.log(value);
                temp += value;
                currentValue.innerHTML = temp;
            }
            if(temp){
                for(x of temp){
                    if(!(x ==="0")){
                        temp += value;
                        currentValue.innerHTML = temp;
                        break;
                    }
                }
            }
        }
        else if(value === "00"){
            if(!temp){
                value = "0";
                temp += value;
                currentValue.innerHTML = temp; 
            }
            if(temp){
                for(x of temp){
                    if(!(x ==="0")){
                        temp += value;
                        currentValue.innerHTML = temp;
                        break;
                    }
                }  
            }
        }
        else{
            //Setting rules for nonzero entry
            if(!(value ==="0") || !(value ==="0")){
                if(temp){
                    if(temp.length ===1 && temp[0]=== "0"){
                        temp =""
                    }
                    if(temp[temp.length-1] === ")"){
                        temp += "*";
                    }
                }
            }
            temp += value;
            currentValue.innerHTML = temp;
        }
    }
    //Setting input limit
    if(currentValue.innerHTML.length >= len){
        currentValue.innerHTML = currentValue.innerHTML.substring(0, len);
        temp = currentValue.innerHTML;
        result.innerHTML ="Maximum 15 characters!"
        result.style.color ="red";
    }
    else{
        //live calculation
        result.innerHTML =eval(temp)
    }
}

//Bracket button
const handleBracket = (value) =>{

    //seeting rules for bracket entry
    if(!temp){
        temp += value[0];
        currentValue.innerHTML = temp;
    }
    else if(temp){
        if(temp.length < len-1){
            if(Number(temp[temp.length-1])){
                if((temp.split("(").length - 1)===0 && !  len-1){
                    temp += "*" + value[0];
                    currentValue.innerHTML = temp;    
                }
                else if((temp.split("(").length - 1)> (temp.split(")").length - 1)){
                    temp += value[1];
                    currentValue.innerHTML = temp;    
                }
                else{
                    temp += "*" + value[0];
                    currentValue.innerHTML = temp; 
                }
            }
            else if((temp[temp.length-1]) ===")"){
                if((temp.split("(").length - 1)=== (temp.split(")").length - 1)){
                    temp += "*" + value[0];
                    currentValue.innerHTML = temp;
                }
                else if((temp.split("(").length - 1)> (temp.split(")").length - 1)){temp += value[1];currentValue.innerHTML = temp}
            }
            else{
                temp += value[0];
                currentValue.innerHTML = temp;
            }
        }
        else{
            if((temp.split("(").length - 1)=== (temp.split(")").length - 1)){
                temp +=value[0];
                currentValue.innerHTML = temp;
            }
            else if((temp.split("(").length - 1)> (temp.split(")").length - 1)){
                temp += value[1];
                currentValue.innerHTML = temp;
                }
            else{
                temp += value[1];
                currentValue.innerHTML = temp;
            }
        }
    }
    //Setting input limit
    if(currentValue.innerHTML.length >=len){
        currentValue.innerHTML = currentValue.innerHTML.substring(0, len);
        temp = currentValue.innerHTML;
        result.innerHTML ="Maximum 15 characters!"
        result.style.color ="red";
    }
    else{
        //live calculation
        result.innerHTML =eval(temp)
    }
}

//Decimal button
const handleDecimal = () =>{
    if(!temp){
        temp += "0"+ decimal.innerHTML;
        currentValue.innerHTML = temp;
        decimal.disabled =true; 
    }
    else{
        temp += decimal.innerHTML;
        currentValue.innerHTML = temp;
        decimal.disabled =true;
    }
    //Enable back button
    backIcon.style.opacity = "1";
    backIcon.disabled = false;
}

//Calculate button
const handleCalculate =() =>{
    //Handling invalid input
    if(!temp){
        result.innerHTML ="Input required!";
        result.style.color ="red";
    }
    else{
        try { eval(temp); } 
        catch (err) {
           if (err instanceof SyntaxError){
               result.innerHTML =(err.message)
               result.style.color= "red";
            }
        }
        //Display answer
        finally {
            currentValue.innerHTML = eval(temp);
            console.log(temp)
            log = temp;
            ans = currentValue.innerHTML;
            currentValue.style.fontSize= "2.5rem"
            result.innerHTML="";
        }      
    }
}

//Back button
const handleBackSpace =() =>{
    var previousValue = temp; 
    currentValue.innerHTML =temp.substring(0, currentValue.innerHTML.length-1);
    temp = currentValue.innerHTML;
    currentValue.style.fontSize= "1.5rem"

    //Remebering deleted value for setting decimal rules
    var deletedValue = currentValue.innerHTML;
    const findTheDifference = (previousValue, deletedValue) => {
       let a = 0, b = 0; let charCode, i = 0;
       while(previousValue[i]){
          a ^= previousValue.charCodeAt(i).toString(2);
          b ^= deletedValue.charCodeAt(i).toString(2);
          i++;
       };
       b^=deletedValue.charCodeAt(i).toString(2);
       charCode = parseInt(a^b,2);
       return String.fromCharCode(charCode);
    };
    //Setting decimal rules after backspace clicked
    if((findTheDifference(previousValue, deletedValue)) ==="."){
        decimal.disabled =false;
    };
    if((findTheDifference(previousValue, deletedValue)) ==="+" || findTheDifference(previousValue, deletedValue) ==="%" 
    || findTheDifference(previousValue, deletedValue) ==="/" || findTheDifference(previousValue, deletedValue)==="*" 
    || findTheDifference(previousValue, deletedValue)==="-"){
        decimal.disabled =true;
    };
    //live calculation 
    if(!history){
        result.innerHTML =currentValue.innerHTML;
        result.style.color ="black";
    }
    else{
        result.innerHTML ="";
        result.innerHTML =eval(temp);
        result.style.color ="black";
    }
    if(!temp){
        result.innerHTML = "";
        currentValue.innerHTML ="";
        backIcon.style.opacity = ".4";
        backIcon.disabled = true;
        decimal.disabled =false;
    }
}

//Clear button
const handleClear =() =>{
    currentValue.innerHTML = "";
    result.innerHTML = "";
    temp = "";
    decimal.disabled =false;

    //Disable back button
    backIcon.style.opacity = ".4";
    backIcon.disabled = true;

    result.style.color ="black";
}

//History button
const handleHistory =() =>{
    log && ans && (result.innerHTML = log + " " +"=" + " " + ans);
}