numberOfCases=document.querySelector("#number-of-cases");
numberOfCasesValue=document.querySelector("#number-of-cases").value;
casesIndicator=document.querySelector(".cases");
decrementCases=document.querySelector(".decrement-cases");
incrementCases=document.querySelector(".increment-cases");

casesIndicator.innerText=numberOfCasesValue+" cases";

decrementCases.addEventListener("click",(e)=>{
    e.preventDefault();
    if(numberOfCasesValue>0){
        numberOfCasesValue--;
        numberOfCases.setAttribute("value",numberOfCasesValue);

        if(numberOfCasesValue===1){
            casesIndicator.innerText=numberOfCasesValue+" case";
        }else{
            casesIndicator.innerText=numberOfCasesValue+" cases";
        }
        
    }
})

incrementCases.addEventListener("click",(e)=>{
    e.preventDefault();
    numberOfCasesValue++;
    numberOfCases.setAttribute("value",numberOfCasesValue);
    if(numberOfCasesValue===1){
        casesIndicator.innerText=numberOfCasesValue+" case";
    }else{
        casesIndicator.innerText=numberOfCasesValue+" cases";
    }
})




