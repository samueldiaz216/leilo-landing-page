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



//footer code

// var footer = document.getElementById("footer");

// var footerHTML ='<div class="row">\
//     <div class="logo">\
//         <img id="footer-logo" src="images/leilo_footer.png" %}">\
//         <p class="copyright">Made in NYC<br>© Leilo 2020</p>\
//     </div>\
//     <div class="links">\
//         <a href="lemon" class="footer">shop</a>\
//         <a href="story" class="footer">our story</a>\
//         <a href="merchcollection" class="footer">merch</a>\
//         <a href="membership" class="footer">membership</a>\
//         <a href="contact" class="footer">contact us</a>\
//         <a href="wholesale" class="footer">wholesale</a>\
//         <a href="faq" class="footer">faq</a>\
//         <a href="privacy" class="footer">privacy policy</a>\
//         <a href="terms" class="footer">terms & conditions</a>\
//     </div>\
//     <div class="disclaimer">\
//         <p class="disclaimer-text">The information and statements on our site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>\
//         <p class="disclaimer-text">Not for use by persons under 18 years of age, or by pregnant or breastfeeding women. Do not combine with alcohol, or drive or operate heavy machinery after consumption. US FDA advises that a potential risk of rare, but severe, liver injury may be associated with kava-containing dietary supplements. Ask a healthcare professional before use if you have or have had liver problems or are taking any medication. Stop use and see a doctor if you develop symptoms that may signal liver problems.</p>\
//     </div>\
//     <div class="social-media">\
//         <a href="https://www.instagram.com/drinkleilo/" class="fa fa-instagram"></a>\
//         <a href="https://www.facebook.com/drinkleilo/" class="fa fa-facebook-square"></a>\
//         <a href="https://twitter.com/drinkleilo" class="fa fa-twitter"></a>\
//     </div>\
// </div>';

// footer.innerHTML = footerHTML;







