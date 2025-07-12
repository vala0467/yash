const dresses = [
    { name: " Nike Air Max ", Image: "  ", price: 2440  },
    { name: "Adidas Ultraboost  ", Image: "  ", price: 2440  },
    { name: "Puma RS-X ", Image: "  ", price: 2440  },
    { name: "Reebok Classic Leather ", Image: "  ", price: 2440  },
    { name: "Skechers D'Lites  ", Image: "  ", price: 2440  },
    { name: " Converse Chuck Taylor All Star ", Image: "  ", price: 2440  },     
    { name: " Vans Old Skool ", Image: "  ", price: 2440  },     
    { name: "Gucci Ace Sneakers  ", Image: "  ", price: 2440  },  
    { name: " Louis Vuitton Trainer Sneaker ", Image: "  ", price: 2440  },
     { name: " Sparx   ", Image: "  ", price: 2440  },
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