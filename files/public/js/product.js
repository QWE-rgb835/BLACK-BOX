// Fetch and display products dynamically
document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("product-grid");

    fetch("/api/products")
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");
                productCard.innerHTML = `
                    <img src="${product.image_url}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productGrid.appendChild(productCard);
            });
        });
});

// Add product to cart
function addToCart(productId) {
    fetch(`/api/cart/add/${productId}`, {
        method: "POST",
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message || "Product added to cart!");
        });
}