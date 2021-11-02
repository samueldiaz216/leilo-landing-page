



const baseURL = "https://drink-leilo.myshopify.com"
const storefrontAccessToken = "8d4a3ef440f145f48513f351e09dc72a"

// Initializing a client to return content in the store's primary language
const client = ShopifyBuy.buildClient({
    domain: 'drink-leilo.myshopify.com',
    storefrontAccessToken: storefrontAccessToken,
});

populateDropdown();


if ($.cookie("checkoutId")) {
    var cartButton = document.getElementById("checkout-button");

    client.checkout.fetch($.cookie("checkoutId")).then((checkout) => {
        cartButton.onclick = function(){forwardToCheckout()};
        populateCart(checkout); 
    });
} else {
    client.checkout.create().then((checkout) => {
        $.cookie("checkoutId", checkout.id, {expires: 1}); // expires in 1 day
        var cartButton = document.getElementById("checkout-button");
        cartButton.onclick = function(){forwardToCheckout()};
    });
}

function forwardToCheckout() {
    client.checkout.fetch($.cookie("checkoutId")).then((checkout) => {
        window.location.href = checkout.webUrl;
    });
}


function populateCart(checkout) {
    var modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = "";
    var discount = 0;
    if (checkout.discountApplications.length > 0) {
        discount = checkout.discountApplications[0].value.percentage;
    }
    for (var i = 0; i < checkout.lineItems.length; i++) {
        var lineItem = checkout.lineItems[i];

        var title = "";
        if (lineItem.title == "Leilo") {
            title = "lemon ginger";
            imagePath = "images/flavors/lemon.png"
        } else {
            title = lineItem.title;
            if (title == "blackberry orange") {
                imagePath = "images/flavors/blackberry.png"
            } else if (title == "raspberry hibiscus") {
                imagePath = "images/flavors/raspberry.png"
            } else if (title == "tango berry") {
                imagePath = "images/flavors/tango.png"
            } else if (title == "sunset variety") {
                imagePath = "images/sunset.png"
            } else if (title == "leilo hoodie") {
                imagePath = "images/bluesweatshirt.png"
            } else if (title == "leilo t-shirt") {
                imagePath = "images/greyshirt.png"
            } else if (title == "leilo hat") {
                imagePath = "images/bluehat.png"
            } else if (title == "leilo joggers") {
                imagePath = "images/joggers.png"
            } else if (title == "leilo bucket hat") {
                imagePath = "images/bucket-hat.png"
            } else if (title == "Leilo lite") {
                imagePath = "images/lite.png"
            }
        }

        var card='<div class="card flex-row flex-wrap justify-content-between align-items-center">\
            <div class="card-header border-0">\
                <img class="cart-item" src="' + imagePath + '">\
            </div>\
            <div class="card-block px-2">\
                <p class="cart-title">' + title + '</p>\
                <p class="cart-size">' + lineItem.variant.title + '</p>\
                <p class="cart-price">$' + Math.floor(lineItem.variant.price * ((100 - discount))) / 100 + ' each</p>\
            </div>\
            <div id="cart-quantity-card" class="card-block px-2 flex-row">\
                <a id="qty-minus-' + i + '">-</a>\
                <h4 class="cart-quantity">' + lineItem.quantity +'</h4>\
                <a id="qty-plus-' + i + '">+</a>\
            </div>\
        </div>';
        modalBody.innerHTML += card;
    }

    for (i = 0; i < checkout.lineItems.length; i++) {
        var lineItem = checkout.lineItems[i];
        var createPlusHandler = function(lineItem) {
            return function() { 
                const lineItemsToAdd = [
                    {
                        variantId: lineItem.variant.id,
                        quantity: 1,
                    }
                ];

                client.checkout.addLineItems($.cookie("checkoutId"), lineItemsToAdd).then((checkout) => {
                    populateCart(checkout);
                }); 
            };
        }

        var createMinusHandler = function(lineItem) {
            return function() { 
                if (lineItem.quantity == 1) {
                    const lineItemsToRemove = [lineItem.id];

                    client.checkout.removeLineItems($.cookie("checkoutId"), lineItemsToRemove).then((checkout) => {
                        populateCart(checkout);
                    });
                }
                
                else {
                    const lineItemsToUpdate = [
                        {
                            id: lineItem.id,
                            quantity: lineItem.quantity - 1,
                        }
                    ];

                    client.checkout.updateLineItems($.cookie("checkoutId"), lineItemsToUpdate).then((checkout) => {
                        populateCart(checkout);
                    });
                } 
            };
        }


        var plus = document.getElementById("qty-plus-" + i);
        plus.onclick = createPlusHandler(lineItem);

        var minus = document.getElementById("qty-minus-" + i);
        minus.onclick = createMinusHandler(lineItem);
    }

    var checkoutTotal = document.getElementById("total");
    checkoutTotal.innerHTML = "total: $" + checkout.totalPrice;
}


numberOfCases=document.querySelector("#quantity");
numberOfCasesValue=document.querySelector("#quantity").value;
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
addToCartButton.setAttribute("id","add-to-cart");
addToCartButton.setAttribute("data-toggle","modal");
addToCartButton.setAttribute("data-target","#cartModal");
addToCartButton.innerText="add to cart";

addToCartButton.addEventListener("click",(e)=>{
    e.preventDefault();
    addToCart1();
})

    

function addToCart1() {
    var quantityField = document.getElementById("quantity");
    var productId = document.getElementById("selected-product-id");
    var mq = window.matchMedia( "(max-width: 45em)" );
    if (mq.matches) {
        quantityField = document.getElementById("quantity");
        productId = document.getElementById("selected-product-id");
    }

    const lineItemsToAdd = [
        {
          variantId: productId.value,
          quantity: parseInt(quantityField.value),
        }
    ];

    client.checkout.addLineItems($.cookie("checkoutId"), lineItemsToAdd).then((checkout) => {

        var cartButton = document.getElementById("checkout-button");
        if (mq.matches) {
            cartButton = document.getElementById("checkout-button");
        }
        cartButton.href = checkout.webUrl;
        populateCart(checkout);
    });
}




function populateDropdown() {
    client.checkout.fetch($.cookie("checkoutId")).then((checkout) => {
        var discount = 0;
        if (checkout.discountApplications.length > 0) {
            discount = checkout.discountApplications[0].value.percentage;
        }
 
        var handle = "";
        var mq = window.matchMedia( "(max-width: 45em)" );
        var flavor = document.getElementById("flavor-name").innerHTML;
        
        
        if (mq.matches) {
            flavor = document.getElementById("flavor-name-mobile").value;
        }
        if (flavor == "lemon ginger") {
            handle = "leilo";
        } else if (flavor == "blackberry orange") {
            handle = "blackberry-orange";
        } else if (flavor == "tango berry") {
            handle = "tango-berry";
        } else if (flavor == "raspberry hibiscus") {
            handle = "raspberry-hibiscus";
        } else if (flavor == "sunset variety") {
            handle = "sunset-variety";
        } else if (flavor == "Leilo hoodie") {
            handle = "unisex-hoodie";
        } else if (flavor == "Leilo shirt") {
            handle = "short-sleeve-unisex-t-shirt";
        } else if (flavor == "Leilo hat") {
            handle = "dad-hat";
        } else if (flavor == "Leilo joggers") {
            handle = "unisex-joggers";
        } else if (flavor == "Leilo bucket hat") {
            handle = "bucket-hat-1";
        } else if (flavor == "Leilo lite") {
            handle = "leilo-lite";
        }

        client.product.fetchByHandle(handle).then((product) => {
            // Do something with the product
            var variantsList = product.variants
            var select = document.getElementById("pack-size");
            var idField = document.getElementById("selected-product-id")
            if (mq.matches) {
                // var select = document.getElementById("pack-size-mobile");
                // var idField = document.getElementById("selected-product-id-mobile")
                var select = document.getElementById("pack-size");
                var idField = document.getElementById("selected-product-id")
            }
            for (var i = 0; i < variantsList.length; i++) {
                var opt = document.createElement("option");
                opt.value = variantsList[i].title;
                opt.textContent = variantsList[i].title;
                select.appendChild(opt);
            }
            
            var price = document.getElementById('price');
            if (mq.matches) {
                // price = document.getElementById('price-mobile');
                price = document.getElementById('price');
            }
            price.innerHTML = "$" + Math.floor(variantsList[0].price * ((100 - discount))) / 100;

            var perCan;
            if (document.getElementById('per-can')){
                perCan = document.getElementById('per-can');
            }; 
            if (mq.matches) {
                if (document.getElementById('per-can-mobile')){
                    perCan = document.getElementById('per-can-mobile');
                };
            }
            var perCanPrice = Math.ceil(variantsList[0].price / 6 * ((100 - discount))) / 100;
            if(typeof perCan !== 'undefined'){
                perCan.innerHTML = "$" + perCanPrice + " per can"
            }

            var index = variantsList.findIndex(x => x.title === "12-pack");

            var title = variantsList[index].title;
            if (title == "12-pack") {
                perCanPrice = Math.ceil(variantsList[index].price / 12 * ((100 - discount))) / 100;
            }
            if(typeof perCan !== 'undefined'){
                perCan.innerHTML = "$" + perCanPrice + " per can"
            }
            idField.value = variantsList[0].id;
        
            select.onchange = function() { 
                var price = document.getElementById('price');
                var perCan;
                if (document.getElementById('per-can')){
                    perCan = document.getElementById('per-can');
                }; 
                if (mq.matches) {
                    // price = document.getElementById('price-mobile');
                    price = document.getElementById('price');
                    if (document.getElementById('per-can-mobile')){
                        perCan = document.getElementById('per-can-mobile');
                    }; 
                }
                var index = variantsList.findIndex(x => x.title === select.value);

                var title = variantsList[index].title;
                var perCanPrice = Math.ceil(variantsList[index].price / 6 * ((100 - discount))) / 100;
                if (title == "12-pack") {
                    perCanPrice = Math.ceil(variantsList[index].price / 12 * ((100 - discount))) / 100;
                }

                var priceDiscount = Math.floor(variantsList[index].price * ((100 - discount))) / 100;
                
                price.innerHTML = "$" + priceDiscount;
                if(typeof perCan !== 'undefined'){
                    perCan.innerHTML = "$" + perCanPrice + " per can"
                }
                idField.value = variantsList[index].id;
            };
        });
    });
}




selectProductIdInput=document.createElement("input");
selectProductIdInput.setAttribute("id","selected-product-id");
selectProductIdInput.setAttribute("value","");
selectProductIdInput.hidden=true;
checkoutIdInput=document.createElement("input");
checkoutIdInput.setAttribute("id","checkout-id");
checkoutIdInput.setAttribute("value","");
checkoutIdInput.hidden=true;

buyVarietyPackForm.appendChild(addToCartButton);
buyVarietyPackForm.appendChild(selectProductIdInput);
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
    counter.classList.toggle("active");
    numberOfCasesValue=1;
    casesIndicator.innerText="1 case";
    buyVarietyPackForm.removeChild(addSubscriptionToCartAnchorTag);
    buyVarietyPackForm.removeChild(subscriptionScript);
    buyVarietyPackForm.appendChild(addToCartButton);
    buyVarietyPackForm.appendChild(selectProductIdInput);
    buyVarietyPackForm.appendChild(checkoutIdInput);
})

subscribeRadioButton.addEventListener("click",()=>{
    counter.classList.toggle("active");
    numberOfCasesValue=0;
    casesIndicator.innerText=numberOfCasesValue+" cases";
    buyVarietyPackForm.removeChild(selectProductIdInput);
    buyVarietyPackForm.removeChild(checkoutIdInput);
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

//Resizing cart button
const cart = document.querySelector("#i-cart");

if(window.innerWidth>1440){
    makeCartBig();
}

window.addEventListener('resize',()=>{
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
