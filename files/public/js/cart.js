// Fetch and display cart items dynamically
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");

    fetch("/api/cart")
        .then(response => response.json())
        .then(cartItems => {
            cartItems.forEach(item => {
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <h3>${item.product_name}</h3>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: $${item.price}</p>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const totalPriceElement = document.createElement("p");
            totalPriceElement.textContent = `Total: $${totalPrice}`;
            cartItemsContainer.appendChild(totalPriceElement);
        });
});

// Remove item from cart
function removeFromCart(cartItemId) {
    fetch(`/api/cart/remove/${cartItemId}`, {
        method: "DELETE",
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message || "Item removed from cart!");
            window.location.reload();
        });
}