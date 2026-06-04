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


const input = document.getElementById("search-input");
const resultsBox = document.getElementById("search-results");

input.addEventListener("input", () => {
  const query = input.value.trim();

  if (query.length < 2) {
    resultsBox.style.display = "none";
    return;
  }
//scearch for products using dummyjson API
  fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then(res => res.json())
    .then(data => {
      resultsBox.innerHTML = "";

      if (data.products.length === 0) {
        resultsBox.innerHTML = `<div class="search-item">No results</div>`;
      } else {
        data.products.slice(0, 6).forEach(p => {
          const item = document.createElement("div");
          item.classList.add("search-item");
          item.textContent = p.title;

          item.addEventListener("click", () => {
            window.location.href = `single-product.html?id=${p.id}`;
          });

          resultsBox.appendChild(item);
        });
      }

      resultsBox.style.display = "block";
    });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search")) {
    resultsBox.style.display = "none";
  }
});



//category dropdown
const dropdown = document.getElementById("category-dropdown");

fetch("https://dummyjson.com/products/category-list")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((cat) => {
      const item = document.createElement("div");
      item.classList.add("category-item");
      item.textContent = cat;

    //   item.addEventListener("click", (e) => {


    //     currentPage = 1;
    //     e.preventDefault();
    //     priceValue.textContent = `Filter by your max budget`;
    //     renderProductsbylink(
    //       `https://dummyjson.com/products/category/${encodeURIComponent(cat)}`,
    //     );
    //     priceFilter(
    //       `https://dummyjson.com/products/category/${encodeURIComponent(cat)}`,
    //     );
       
    //   });
    item.addEventListener("click", (e) => {
  e.preventDefault();

  const isAllProductsPage = window.location.pathname.includes("all-products");

  if (isAllProductsPage) {
    // 👇 انت بالفعل في الصفحة
    currentPage = 1;
    priceValue.textContent = `Filter by your max budget`;

    renderProductsbylink(
      `https://dummyjson.com/products/category/${encodeURIComponent(cat)}`
    );

    priceFilter(
      `https://dummyjson.com/products/category/${encodeURIComponent(cat)}`
    );
  } else {
    localStorage.setItem("selectedCategory", cat);
    window.location.href = "all-products.html";
  }
});

      dropdown.appendChild(item);
    });
  });

  const categoryMenu = document.querySelector(".category-menu");

categoryMenu.addEventListener("mouseenter", () => {
  dropdown.style.display = "block";
});

categoryMenu.addEventListener("mouseleave", () => {
  dropdown.style.display = "none";
});