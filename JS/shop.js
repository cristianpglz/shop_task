// Function to get the products saved in local storage
function getSavedProducts() {
    const savedProductsJSON = localStorage.getItem('savedProducts');
    return savedProductsJSON ? JSON.parse(savedProductsJSON) : [];
}

// Function to save products to local storage
/**
 * Description
 * @param {any} products - The input data representing products.
 * @returns {any}
 */
function saveProducts(products) {
    localStorage.setItem('savedProducts', JSON.stringify(products));
}

// Function to update saved products after changes in the shopping cart
function updateSavedProducts() {
    const productsInCart = Array.from(document.querySelectorAll('#products_in_the_cart .card_product')).map(productElement => {
        const nameElement = productElement.querySelector('.product_information p:first-child');
        const priceElement = productElement.querySelector('.product_information p:last-child');

        return {
            name: nameElement ? nameElement.textContent.trim() || "" : "",
            imageSrc: productElement.querySelector('img').src || "",
            price: priceElement ? priceElement.textContent.trim() || "" : ""
        };
    });

    saveProducts(productsInCart);
}

// Function to create a product element in the shopping cart
/**
 * Description
 * @param {any} productInfo- The input data representing products information.
 * @returns {any}
 */
function createProductElement(productInfo) {
    const newProductElement = document.createElement('div');
    newProductElement.className = 'card_product';
    newProductElement.dataset.productName = productInfo.name;

    newProductElement.innerHTML = `
        <button class="remove-button" onclick="removeProduct(this)">❌</button>
        <img src="${productInfo.imageSrc}" alt="">
        <div class="product_information">
            <p>${productInfo.name}</p>
            <p>${productInfo.price}</p>
            
        </div>
    `;

    return newProductElement;
}

// Function to remove a product from the shopping cart
/**
 * Description
 * @param {any} button - The HTML button element triggering the event.
 * @returns {any}
 */
function removeProduct(button) {
    const productElement = button.closest('.card_product');
    if (productElement) {
        productElement.remove();
        updateSavedProducts();
    }
}

// Drag handling function
/**
 * Description
 * @param {any} ev - Event in HTML
 * @returns {any}
 */
function dragstartHandler(ev) {
    const productInfo = {
        imageSrc: ev.target.querySelector('img').src,
        name: ev.target.querySelector('.product_information p:first-child').textContent,
        price: ev.target.querySelector('.product_information p:last-child').textContent
    };

    if (productInfo.imageSrc && productInfo.name && productInfo.price) {
        ev.dataTransfer.setData("text/plain", JSON.stringify(productInfo));
        ev.dataTransfer.effectAllowed = "move";
    } else {
        console.error("Product data is not valid");
    }
}

// Drop handling function
/**
 * Description
 * @param {any} ev - Event in HTML
 * @returns {any}
 */
function dropHandler(ev) {
    ev.preventDefault();
    const jsonString = ev.dataTransfer.getData("text/plain").trim();

    if (jsonString === "") {
        console.error("JSON string is empty");
        return;
    }

    try {
        const productInfo = JSON.parse(jsonString);

        // Check if the product is already in the shopping cart
        const existingProduct = document.querySelector(`#products_in_the_cart [data-product-name="${productInfo.name}"]`);
        if (existingProduct) {
            console.log("Product is already in the cart. Will not add a duplicate.");
            return;
        }

        // Check if the current number of products in the cart is less than the minimum limit
        const currentProductCount = document.querySelectorAll('#products_in_the_cart .card_product').length;
        const minProductCount = 6;

        if (currentProductCount >= minProductCount) {
            console.log(`The minimum limit of ${minProductCount} products in the cart has been reached.`);
            return;
        }

        // Add the product to the container
        const newProductElement = createProductElement(productInfo);
        ev.target.appendChild(newProductElement);

        // Remove the dragged node
        ev.dataTransfer.clearData();

        // Update saved products
        updateSavedProducts();
    } catch (error) {
        console.error("Error parsing JSON string:", error);
    }
}

// Drag over handling function
/**
 * Description
 * @param {any} ev - Event in HTML
 * @returns {any}
 */
function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

// Add drag and drop events to relevant elements
document.addEventListener("DOMContentLoaded", function () {
    console.log("shop.js loaded");

    const dropContainer = document.getElementById('products_in_the_cart');
    dropContainer.addEventListener('drop', dropHandler);
    dropContainer.addEventListener('dragover', dragoverHandler);

    // Get products directly from local storage
    const savedProducts = getSavedProducts();

    // Add saved products to the container when the page loads
    savedProducts.forEach(productInfo => {
        if (productInfo.name && productInfo.imageSrc && productInfo.price) {
            const newProductElement = createProductElement(productInfo);
            dropContainer.appendChild(newProductElement);
        }
    });

    const draggables = document.querySelectorAll('.card_product');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragstartHandler);
    });
});

console.log(JSON.parse(localStorage.getItem('savedProducts')));

// Capture User Data
getUserData();

// Check the Data
if (!checkUserData()) {
    // If user data is not valid, redirect to "entryForm.html"
    location = "entryForm.html";
}


