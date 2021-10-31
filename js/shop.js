
function populateDropdown() {
    client.checkout.fetch($.cookie("checkoutId")).then((checkout) => {
        var discount = 0;
        if (checkout.discountApplications.length > 0) {
            discount = checkout.discountApplications[0].value.percentage;
        }
        alert("kk");
        var handle = "";
        var mq = window.matchMedia( "(max-width: 45em)" );
        var flavor = document.getElementById("flavor-name").innerHTML;
        
        if (mq.matches) {
            flavor = document.getElementById("flavor-name-mobile").innerHTML;
        }
        if (flavor == "lemon ginger") {
            handle = "leilo";
        } else if (flavor == "blackberry orange") {
            handle = "blackberry-orange";
        } else if (flavor == "tango berry") {
            handle = "tango-berry";
        } else if (flavor == "raspberry hibiscus") {
            handle = "raspberry-hibiscus";
        } else if (flavor == "sunset variety pack") {
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
                var select = document.getElementById("pack-size-mobile");
                var idField = document.getElementById("selected-product-id-mobile")
            }
            for (var i = 0; i < variantsList.length; i++) {
                var opt = document.createElement("option");
                opt.value = variantsList[i].title;
                opt.textContent = variantsList[i].title;
                select.appendChild(opt);
            }
            
            var price = document.getElementById('price');
            if (mq.matches) {
                price = document.getElementById('price-mobile');
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

            var index = variantsList.findIndex(x => x.title === select.value);
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
                    price = document.getElementById('price-mobile');
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

populateDropdown();

var mq = window.matchMedia( "(max-width: 45em)" );

var addToCartButton = document.getElementById("add-to-cart");
if (mq.matches) {
    addToCartButton = document.getElementById("add-to-cart-mobile");
}
addToCartButton.onclick = function(){addToCart()};

function addToCart() {
    var quantityField = document.getElementById("quantity");
    var productId = document.getElementById("selected-product-id");
    var mq = window.matchMedia( "(max-width: 45em)" );
    if (mq.matches) {
        quantityField = document.getElementById("quantity-mobile");
        productId = document.getElementById("selected-product-id-mobile");
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

function inspectFront() {
    var flavor = document.getElementById("flavor-name").innerHTML;
    var mq = window.matchMedia( "(max-width: 45em)" );
    if (mq.matches) {
        flavor = document.getElementById("flavor-name-mobile").innerHTML;
    }
    if (flavor == "lemon ginger") {
        handle = "lemon";
    } else if (flavor == "blackberry orange") {
        handle = "blackberry";
    } else if (flavor == "tango berry") {
        handle = "tango";
    } else if (flavor == "raspberry hibiscus") {
        handle = "raspberry";
    } else if (flavor == "Leilo lite") {
        handle = "lite";
    }
    
    if (mq.matches) {
        document.getElementById("inspect-frame-mobile").src = "images/flavors/" + handle + ".png";
    }
     document.getElementById("inspect-frame").src = "images/flavors/" + handle + ".png";
}

function inspectBack() {
    var flavor = document.getElementById("flavor-name").innerHTML;
    var mq = window.matchMedia( "(max-width: 45em)" );
    if (mq.matches) {
        console.log("Matches")
        flavor = document.getElementById("flavor-name-mobile").innerHTML;
    }
    if (flavor == "lemon ginger") {
        handle = "lemon";
    } else if (flavor == "blackberry orange") {
        handle = "blackberry";
    } else if (flavor == "tango berry") {
        handle = "tango";
    } else if (flavor == "raspberry hibiscus") {
        handle = "raspberry";
    } else if (flavor == "Leilo lite") {
        handle = "lite";
    }
    var mq = window.matchMedia( "(max-width: 45em)" );
    if (mq.matches) {
        document.getElementById("inspect-frame-mobile").src = "images/flavors/" + handle + "_back.png";
    }
        document.getElementById("inspect-frame").src = "images/flavors/" + handle + "_back.png";
}

function inspectNutrition() {
    var flavor = document.getElementById("flavor-name").innerHTML;
    if (mq.matches) {
        flavor = document.getElementById("flavor-name-mobile").innerHTML;
    }
    if (flavor == "lemon ginger") {
        handle = "lemon";
    } else if (flavor == "blackberry orange") {
        handle = "blackberry";
    } else if (flavor == "tango berry") {
        handle = "tango";
    } else if (flavor == "raspberry hibiscus") {
        handle = "raspberry";
    } else if (flavor == "Leilo lite") {
        handle = "lite";
    }
        document.getElementById("inspect-frame-mobile").src = "images/flavors/" + handle + "_supp_facts_fill.png";
        document.getElementById("inspect-frame").src = "images/flavors/" + handle + "_supp_facts_fill.png";
}