// Fetch and manage products dynamically
document.addEventListener("DOMContentLoaded", () => {
    const productManagement = document.getElementById("product-management");

    fetch("/api/products")
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productRow = document.createElement("div");
                productRow.classList.add("product-row");
                productRow.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                `;
                productManagement.appendChild(productRow);
            });
        });
});

// Add new product
document.getElementById("add-product-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message || "Product added successfully!");
            window.location.reload();
        });
});

// Delete product
function deleteProduct(productId) {
    fetch(`/api/products/${productId}`, {
        method: "DELETE",
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message || "Product deleted successfully!");
            window.location.reload();
        });
}