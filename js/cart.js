const baseURL = "https://drink-leilo.myshopify.com"
const storefrontAccessToken = "8d4a3ef440f145f48513f351e09dc72a" // doesn't need to kept secret

// Initializing a client to return content in the store's primary language
const client = ShopifyBuy.buildClient({
    domain: 'drink-leilo.myshopify.com',
    storefrontAccessToken: storefrontAccessToken,
});

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
                imagePath = "images/flavors/sunset.png"
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

        var card='<div class="card flex-row flex-wrap">\
            <div class="card-header border-0">\
                <img class="cart-item" src="' + imagePath + '">\
            </div>\
            <div class="card-block px-2">\
                <h4 class="cart-title">' + title + '</h4>\
                <h4 class="cart-size">' + lineItem.variant.title + '</h4>\
                <h4 class="cart-price">$' + Math.floor(lineItem.variant.price * ((100 - discount))) / 100 + ' each</h4>\
            </div>\
            <div id="cart-quantity-card" class="card-block px-2">\
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