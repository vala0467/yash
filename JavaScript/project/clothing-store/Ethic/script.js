const dresses = [
    { name: "Casual Dress", Image: "https://www.beyoung.in/blog/wp-content/uploads/2020/04/SEMI-CASUAL1-compressed-931x1024.jpg", price: 499 },
    { name: "Formal Dress", Image: "https://i.pinimg.com/736x/71/c5/c6/71c5c656c4e04e24b8c40fdbd72b401b.jpg", price: 799 },
    { name: "Party Dress", Image: "https://bharatreshma.com/cdn/shop/files/H2_5_960x_crop_center.jpg?v=1726998043", price: 999 },
    { name: "Traditional Dress", Image: "https://static.wixstatic.com/media/253962_b19a61cfc97442f4b13661b0ae58d74c~mv2.jpg/v1/fill/w_727,h_1000,al_c,q_85,usm_0.66_1.00_0.01/253962_b19a61cfc97442f4b13661b0ae58d74c~mv2.jpg", price: 899 },
    { name: "Wedding Dress", Image: "https://i.pinimg.com/236x/95/95/2f/95952f844e03fc88e66e60d964d739cd.jpg", price: 1999 },
    { name: "Summer Dress", Image: "https://cdn.shopify.com/s/files/1/0094/6326/7379/files/polos_600x600.png?v=1647241937", price: 599 },
     { name: " Sherwani", Image:  "https://cdn.sareeka.com/image/cache/data2024/purple-rayon-buttons-and-plain-work-sherwani-mens-wear-for-men-297763-1000x1375.jpg", price: 899 },
      { name: " Nehru", Image: "https://imagescdn.jaypore.com/img/app/product/3/39626900-12923641.jpg?w=500&auto=format ", price: 699 },
       { name: "Pathani suit ", Image: " https://i.pinimg.com/736x/23/97/6d/23976d21f46fdd3f6eb2ddab96888d41.jpg ", price: 799 },
        { name: "Achkan ", Image: "https://needlesnthimbles.com/wp-content/uploads/2022/01/content_Achkan-Sherwani.jpg ", price: 1199 },
];

const cart = {};

const productGrid = document.getElementById('productGrid');
const cartSection = document.getElementById('cartSection');

function renderProducts() {
    dresses.forEach((dress, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const img = document.createElement('img');
        img.src = dress.Image;
        img.alt = dress.name;

        const name = document.createElement('div');
        name.className = 'product-name';
        name.textContent = dress.name;

        const price = document.createElement('div');
        price.className = 'product-price';
        price.textContent = `₹${dress.price}`;

        const qtyLabel = document.createElement('div');
        qtyLabel.textContent = 'Qty: ';

        const qtySpan = document.createElement('span');
        qtySpan.textContent = '0';
        qtySpan.id = `qty-${index}`;

        const incBtn = document.createElement('button');
        incBtn.textContent = '+';
        incBtn.onclick = () => {
            qtySpan.textContent = parseInt(qtySpan.textContent) + 1;
        };

        const decBtn = document.createElement('button');
        decBtn.textContent = '-';
        decBtn.onclick = () => {
            if (parseInt(qtySpan.textContent) > 0) {
                qtySpan.textContent = parseInt(qtySpan.textContent) - 1;
            }
        };

        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.onclick = () => {
            const qty = parseInt(qtySpan.textContent);
            if (qty > 0) {
                cart[dress.name] = {
                    ...dress,
                    quantity: qty
                };
                renderCart();
            } else {
                alert("Quantity must be greater than 0 to add to cart.");
            }
        };

        qtyLabel.appendChild(incBtn);
        qtyLabel.appendChild(qtySpan);
        qtyLabel.appendChild(decBtn);

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(qtyLabel);
        card.appendChild(addToCartBtn);
        productGrid.appendChild(card);
    });
}

function renderCart() {
    cartSection.innerHTML = '';
    let total = 0;
    for (const item in cart) {
        const cartItem = cart[item];
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.textContent = `${cartItem.name} - Qty: ${cartItem.quantity} - ₹${cartItem.quantity * cartItem.price}`;
        total += cartItem.quantity * cartItem.price;
        cartSection.appendChild(div);
    }

    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total';
    totalDiv.textContent = `Total Amount: ₹${total}`;
    cartSection.appendChild(totalDiv);
}

// Initialize
renderProducts();