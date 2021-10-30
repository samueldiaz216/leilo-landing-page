numberOfCases=document.querySelector("#number-of-cases");
numberOfCasesValue=document.querySelector("#number-of-cases").value;
casesIndicator=document.querySelector(".cases");
decrementCases=document.querySelector(".decrement-cases");
incrementCases=document.querySelector(".increment-cases");
subscribeRadioButton=document.querySelector(".subscribe");
oneTimeOrderRadioButton=document.querySelector(".one-time-order");
counter=document.querySelector(".variety-pack-content-counter");
buyVarietyPackForm=document.querySelector(".variety-pack-content1 form");


addToCartButton=document.createElement("button");

addToCartButton.classList.add("add-to-cart-button");
addToCartButton.classList.add("leilo-button-blue");
addToCartButton.innerText="add to cart";

buyVarietyPackForm.appendChild(addToCartButton);





addSubscriptionToCartAnchorTag=document.createElement("a");
addSubscriptionToCartAnchorTag.setAttribute("href","https://withfriends.co/Leilo/join?utm_campaign=wf-websitelink");
subAddToCartButton=document.createElement("button");

subAddToCartButton.classList.add("add-to-cart-button");
subAddToCartButton.classList.add("leilo-button-blue");
subAddToCartButton.innerText="add to cart";
addSubscriptionToCartAnchorTag.appendChild(subAddToCartButton);

subscriptionScript=document.createElement("script");
subscriptionScript.setAttribute("type", "text/javascript");
subscriptionScript.setAttribute("src", "https://danjg53usxhfc.cloudfront.net/api/wf-embed-btn.js?b=Leilo");


addSubscriptionToCartButtonHTML="<a href='https://withfriends.co/Leilo/join?utm_campaign=wf-websitelink'>"+addToCartButton+"</a><script type='text/javascript' src='https://danjg53usxhfc.cloudfront.net/api/wf-embed-btn.js?b=Leilo'></script>";




oneTimeOrderRadioButton.addEventListener("click",()=>{
    counter.classList.toggle("active");
    numberOfCasesValue=1;
    casesIndicator.innerText="1 case";
    buyVarietyPackForm.removeChild(addSubscriptionToCartAnchorTag);
    buyVarietyPackForm.removeChild(subscriptionScript);
    buyVarietyPackForm.appendChild(addToCartButton);
})

subscribeRadioButton.addEventListener("click",()=>{
    counter.classList.toggle("active");
    numberOfCasesValue=0;
    casesIndicator.innerText=numberOfCasesValue+" cases";
    buyVarietyPackForm.removeChild(addToCartButton);
    buyVarietyPackForm.appendChild(addSubscriptionToCartAnchorTag);
    buyVarietyPackForm.appendChild(subscriptionScript);
})



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

//Prevent contact form from redirecting
$('#email_signup').submit(function(e){
    e.preventDefault();
    $.ajax({
        url: 'https://manage.kmail-lists.com/subscriptions/subscribe?a=WfCKbu&g=YxQqHN',
        type: 'post',
        data:$('#email_signup').serialize(),
        success:function(){
        }
    });

    
    
});









