const dresses = [
    { name: "Rolex Submariner ", Image: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ixmPW30k9uL0/v0/-1x-1.webp ", price: 144000 },
     { name: " Omega Speedmaster", Image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGhyX5tVE1JrPCNLYuYUjnUM9659rTFmlsxxa7Y-sNpOQ2L4p7dQpAHB0WCAatGbYvOp6QnHkl_ZgCvAu1fmU4hDDbRbf2BnSjxrWnlksfmT1KhnfTVcKalQ ", price: 616000 },
     { name: "Casio G-Shock ", Image: " https://www.casio.com/content/dam/casio/product-info/locales/in/en/timepiece/product/watch/G/GB/gbm/gbm-2100-1a/assets/GBM-2100-1A.png.transform/main-visual-sp/image.png ", price: 15000 },
     { name: "Titan ", Image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw1888ad40/images/Titan/Catalog/1805QM01_1.jpg?sw=800&sh=800 ", price: 300000 },
     { name: "Fastrack ", Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmYq7CbByxwrWIxPccbUeSIlJKdkWPkbm97g&s ", price: 330000 },
     { name: " Sonata", Image: "https://www.sonatawatches.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw24cb40e6/images/Sonata/Catalog/77105SM01_1.jpg?sw=800&sh=800 ", price: 10000 },
     { name: "Timex India ", Image: "https://shop.timexindia.com/cdn/shop/files/TW2W51300.jpg?v=1714886125 ", price: 3500 },
      { name: "Maxima ", Image: " https://www.maximawatches.com/cdn/shop/files/48811CMGS_grande.jpg?v=1708409557", price: 2000 },
       { name: " Longines Master Collection", Image: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ3ug5ci4je311jsx76K8NFp-oJb_SqS4TDQ&s", price: 5000 },
        { name: "Cartier Tank  ", Image: "https://int.cartier.com/content/dam/rcq/car/2U/oB/pw/1m/QC/ah/kE/7H/qn/F8/JA/2UoBpw1mQCahkE7HqnF8JA.png.scale.314.high.tank-must-solarbeat%E2%84%A2-watch-steel.png ", price: 2500 },
       
    
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