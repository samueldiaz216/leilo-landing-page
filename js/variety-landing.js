
numberOfCases=document.querySelector("#quantity");
numberOfCasesValue=document.querySelector("#quantity").value;
numberOfCasesMobile=document.querySelector("#quantity-mobile");
numberOfCasesMobileValue=document.querySelector("#quantity-mobile").value;
casesIndicator=document.querySelector(".cases");
decrementCases=document.querySelector(".decrement-cases");
incrementCases=document.querySelector(".increment-cases");
subscribeRadioButton=document.querySelector(".subscribe");
oneTimeOrderRadioButton=document.querySelector(".one-time-order");
counter=document.querySelector(".variety-pack-content-counter");
buyVarietyPackForm=document.querySelector(".variety-pack-content1 form");


var mq = window.matchMedia( "(max-width: 45em)" );


addToCartButton=document.createElement("button");

addToCartButton.classList.add("add-to-cart-button");
addToCartButton.classList.add("leilo-button-blue");
addToCartButton.setAttribute("id","add-to-cart");
if(mq.matches) {
    addToCartButton.setAttribute("id","add-to-cart-mobile");
}
addToCartButton.setAttribute("data-toggle","modal");
addToCartButton.setAttribute("type","button");
addToCartButton.setAttribute("data-target","#cartModal");
addToCartButton.innerText="add to cart";



    




selectProductIdInput=document.createElement("input");
selectProductIdInput.setAttribute("id","selected-product-id");
selectProductIdInput.setAttribute("value","");
selectProductIdInput.setAttribute("type","hidden");
selectProductIdInputMobile=document.createElement("input");
selectProductIdInputMobile.setAttribute("id","selected-product-id-mobile");
selectProductIdInputMobile.setAttribute("value","");
selectProductIdInputMobile.setAttribute("type","hidden");
checkoutIdInput=document.createElement("input");
checkoutIdInput.setAttribute("id","checkout-id");
checkoutIdInput.setAttribute("value","");
checkoutIdInput.setAttribute("type","hidden");

buyVarietyPackForm.appendChild(addToCartButton);
buyVarietyPackForm.appendChild(selectProductIdInput);
buyVarietyPackForm.appendChild(selectProductIdInputMobile);
buyVarietyPackForm.appendChild(checkoutIdInput);





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
    counter.classList.add("active");
    numberOfCasesValue=1;
    numberOfCasesMobileValue=1;
    casesIndicator.innerText="1 case";
    buyVarietyPackForm.removeChild(addSubscriptionToCartAnchorTag);
    buyVarietyPackForm.removeChild(subscriptionScript);
    buyVarietyPackForm.appendChild(addToCartButton);
    buyVarietyPackForm.appendChild(selectProductIdInput);
    buyVarietyPackForm.appendChild(selectProductIdInputMobile);
    buyVarietyPackForm.appendChild(checkoutIdInput);
})

subscribeRadioButton.addEventListener("click",()=>{
    counter.classList.remove("active");
    numberOfCasesValue=0;
    numberOfCasesMobileValue=0;
    casesIndicator.innerText=numberOfCasesValue+" cases";
    buyVarietyPackForm.removeChild(selectProductIdInput);
    buyVarietyPackForm.removeChild(selectProductIdInputMobile);
    buyVarietyPackForm.removeChild(checkoutIdInput);
    buyVarietyPackForm.removeChild(addToCartButton);
    buyVarietyPackForm.appendChild(addSubscriptionToCartAnchorTag);
    buyVarietyPackForm.appendChild(subscriptionScript);
})



decrementCases.addEventListener("click",(e)=>{
    e.preventDefault();
    if(numberOfCasesValue>0){
        numberOfCasesValue--;
        numberOfCasesMobileValue--;
        numberOfCases.setAttribute("value",numberOfCasesValue);
        numberOfCasesMobile.setAttribute("value",numberOfCasesValue);

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
    numberOfCasesMobileValue++;
    numberOfCases.setAttribute("value",numberOfCasesValue);
    numberOfCasesMobile.setAttribute("value",numberOfCasesMobileValue);
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

//Resizing cart button
const cart = document.querySelector("#i-cart");

if(window.innerWidth>1440){
    makeCartBig();
}

window.addEventListener('resize',()=>{

    if(mq.matches){
        addToCartButton.setAttribute("id","add-to-cart-mobile");
        populateDropdown();
    }else{
        addToCartButton.setAttribute("id","add-to-cart");
        populateDropdown();
    }


    if(window.innerWidth>1440){
        makeCartBig();
    }else{
        makeCartSmall();
    }
})

function makeCartBig(){
    cart.setAttribute("width","56");
    cart.setAttribute("height","56");
}

function makeCartSmall(){
    cart.setAttribute("width","36");
    cart.setAttribute("height","36");
}