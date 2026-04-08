fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    const products = data.products;
    const parent = document.getElementById("products");

    for (let i = 0; i < 4; i++) {
      const p = products[i];

      // Create Elements
      const productCard = document.createElement("div");
      const imageContainer = document.createElement("div");
      const image = document.createElement("img");
      const overlay = document.createElement("div");
      const overlayBtn = document.createElement("button"); // NEW: Action button inside overlay

      const infoContainer = document.createElement("div"); // NEW: Wrapper for text
      const brand = document.createElement("span"); // NEW: Brand label
      const title = document.createElement("h5");
      const priceAndStock = document.createElement("div"); // NEW: Wrapper to align price and stock
      const stock = document.createElement("div");
      const price = document.createElement("div");

      // Setup Classes
      productCard.classList.add("new-arrival-item");
      imageContainer.classList.add("image-container");
      overlay.classList.add("overlay");
      overlayBtn.classList.add("overlay-btn");
      infoContainer.classList.add("product-info");
      brand.classList.add("product-brand");
      priceAndStock.classList.add("price-stock-wrapper");
      title.classList.add("product-title");
      price.classList.add("product-price");

      // Populate Data
      image.src = p.images[0];
      brand.textContent = "YH Market";
      title.textContent = p.title;
      overlayBtn.textContent = "Quick View";
      price.textContent = `$${p.price}`;

      overlayBtn.addEventListener("click", () => {
        window.location.href = `single-product.html?id=${p.id}`;
      });
      if (Number(p.stock) > 0) {
        stock.textContent = `Stock: ${p.stock}`;
        stock.classList.add("stock-badge", "in-stock");
      } else {
        stock.textContent = "Out of stock";
        stock.classList.add("stock-badge", "out-stock");
      }

      // Assemble the Image Container
      overlay.append(overlayBtn);
      imageContainer.append(image, overlay);

      // Assemble the Info Container
      priceAndStock.append(price, stock);
      infoContainer.append(brand, title, priceAndStock);

      // Assemble the Final Card
      productCard.append(imageContainer, infoContainer);
      parent.append(productCard);
    }
  })
  .catch((error) => {
    // It is always a good idea to catch network errors!
    console.error("Error fetching products:", error);
  });

fetch("https://dummyjson.com/products/category/tops")
  .then((res) => res.json())
  .then((data) => {
    // 1. Rename to 'products' (plural) to avoid naming collisions
    const products = data.products;
    const parent = document.getElementById("top-selling");

    for (let i = 0; i < 4; i++) {
      const p = products[i];

      // Create Elements
      const productCard = document.createElement("div");
      const imageContainer = document.createElement("div");
      const image = document.createElement("img");
      const overlay = document.createElement("div");
      const overlayBtn = document.createElement("button"); // NEW: Action button inside overlay

      const infoContainer = document.createElement("div"); // NEW: Wrapper for text
      const brand = document.createElement("span"); // NEW: Brand label
      const title = document.createElement("h5");
      const priceAndStock = document.createElement("div"); // NEW: Wrapper to align price and stock
      const stock = document.createElement("div");
      const price = document.createElement("div");

      // Setup Classes
      productCard.classList.add("new-arrival-item");
      imageContainer.classList.add("image-container");
      overlay.classList.add("overlay");
      overlayBtn.classList.add("overlay-btn");
      infoContainer.classList.add("product-info");
      brand.classList.add("product-brand");
      priceAndStock.classList.add("price-stock-wrapper");
      title.classList.add("product-title");
      price.classList.add("product-price");

      overlayBtn.addEventListener("click", () => {
        window.location.href = `single-product.html?id=${p.id}`;
      });
      // Populate Data
      image.src = p.images[0];
      brand.textContent = "YH Market";
      title.textContent = p.title;
      overlayBtn.textContent = "Quick View";
      price.textContent = `$${p.price}`;

      if (Number(p.stock) > 0) {
        stock.textContent = `Stock: ${p.stock}`;
        stock.classList.add("stock-badge", "in-stock");
      } else {
        stock.textContent = "Out of stock";
        stock.classList.add("stock-badge", "out-stock");
      }

      // Assemble the Image Container
      overlay.append(overlayBtn);
      imageContainer.append(image, overlay);

      // Assemble the Info Container
      priceAndStock.append(price, stock);
      infoContainer.append(brand, title, priceAndStock);

      // Assemble the Final Card
      productCard.append(imageContainer, infoContainer);
      parent.append(productCard);
    }
  })
  .catch((error) => {
    // It is always a good idea to catch network errors!
    console.error("Error fetching products:", error);
  });

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("main-nav");

  window.addEventListener("scroll", () => {
    // If the page is scrolled down more than 50px
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      // If we are at the very top of the page
      navbar.classList.remove("scrolled");
    }
  });
});

const cartPanel = document.getElementById("cart");
const overlay = document.getElementById("cart-overlay");
const btn = document.getElementById("cart-btn");

btn.addEventListener("click", () => {
  cartPanel.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Close when clicking outside
overlay.addEventListener("click", () => {
  cartPanel.classList.remove("active");
  overlay.classList.remove("active");
});
