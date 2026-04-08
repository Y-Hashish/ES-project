const priceValue = document.getElementById("price-range-value");
const parent = document.getElementById("product-grid");
let currentproducts_lable = document.getElementById("current-products");
var maxprice = 0;
var minprice = 1000000;
var currentprice = 0;
var currentproductsingrid;
var currentPage = 1;
let allProducts = [];
let currentSort = "Most Popular";
var firstprodindecator = 0;
var lastprodindecator = 9;

renderProductsbylink();

function sortProducts(type) {
  if (!currentproductsingrid) return;

  let sorted = [...currentproductsingrid];

  if (type === "Most Popular") {
    sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  if (type === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (type === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  }

  if (type === "name-asc") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (type === "name-desc") {
    sorted.sort((a, b) => b.title.localeCompare(a.title));
  }

  currentPage = 1;

  managePage(sorted);
  parent.innerHTML = "";
  renderProducts(sorted, 0, 9);
  currentproductsingrid = sorted;
}
function ratingToStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  return "★".repeat(fullStars) + (halfStar ? "⯪" : "") + "☆".repeat(emptyStars);
}
function applyAll() {
  let result = [...allProducts];

  if (currentprice) {
    result = result.filter((p) => p.price <= currentprice);
  }

  if (currentSort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  }
  if (currentSort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }

  currentproductsingrid = result;

  currentPage = 1;
  managePage(result);
  parent.innerHTML = "";
  renderProducts(result, 0, 9);
}
function managePage(products) {
  currentPage = currentPage || 1;

  const totalPages = Math.ceil(products.length / 9);
  const parentPagination = document.getElementById("pagination-info");

  parentPagination.innerHTML = "";

  function createBtn(i) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("pagination-btn");

    if (i === currentPage) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      firstprodindecator = (i - 1) * 9;
      lastprodindecator = i * 9;

      parent.innerHTML = "";
      renderProducts(products, firstprodindecator, lastprodindecator);
      currentproducts_lable.textContent =
        "Showing products " +
        (firstprodindecator + 1) +
        " to " +
        Math.min(lastprodindecator, products.length) +
        " of " +
        products.length;

      managePage(products);
    });

    parentPagination.appendChild(btn);
  }

  function createDots() {
    const span = document.createElement("span");
    span.textContent = "...";
    parentPagination.appendChild(span);
  }

  // Always show first page
  createBtn(1);

  if (currentPage > 3) {
    createDots();
  }

  // Show pages around current page
  let start = Math.max(2, currentPage - 2);
  let end = Math.min(totalPages - 1, currentPage + 2);

  for (let i = start; i <= end; i++) {
    createBtn(i);
  }

  if (currentPage < totalPages - 2) {
    createDots();
  }

  // Always show last page
  if (totalPages > 1) {
    createBtn(totalPages);
  }
  let nextPageBtn = document.getElementById("next-page");
  let prevPageBtn = document.getElementById("prev-page");

  nextPageBtn.replaceWith(nextPageBtn.cloneNode(true));
  prevPageBtn.replaceWith(prevPageBtn.cloneNode(true));

  nextPageBtn = document.getElementById("next-page");
  prevPageBtn = document.getElementById("prev-page");
  nextPageBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      firstprodindecator = (currentPage - 1) * 9;
      lastprodindecator = currentPage * 9;

      parent.innerHTML = "";
      currentproducts_lable.textContent =
        "Showing products " +
        (firstprodindecator + 1) +
        " to " +
        Math.min(lastprodindecator, products.length) +
        " of " +
        products.length;

      renderProducts(products, firstprodindecator, lastprodindecator);
      managePage(products);
    }
  });
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      firstprodindecator = (currentPage - 1) * 9;
      lastprodindecator = currentPage * 9;

      parent.innerHTML = "";

      currentproducts_lable.textContent =
        "Showing products " +
        (firstprodindecator + 1) +
        " to " +
        Math.min(lastprodindecator, products.length) +
        " of " +
        products.length;

      renderProducts(products, firstprodindecator, lastprodindecator);
      managePage(products);
    }
  });
}
function renderProducts(pp, firstprodindecator, lastprodindecator) {
  currentproducts_lable.textContent =
    "Showing products " +
    (firstprodindecator + 1) +
    " to " +
    Math.min(lastprodindecator, pp.length) +
    " of " +
    pp.length;
  const fragment = document.createDocumentFragment();

  for (
    let i = firstprodindecator;
    i < lastprodindecator && i < pp.length;
    i++
  ) {
    const p = pp[i];
    // Create Elements
    const productCard = document.createElement("div");
    const imageContainer = document.createElement("div");
    const image = document.createElement("img");
    const overlay = document.createElement("div");
    const brand = document.createElement("span");
    const title = document.createElement("h5");
    const priceAndStock = document.createElement("div");
    const stock = document.createElement("div");
    const price = document.createElement("div");
    const rating = document.createElement("div");

    imageContainer.append(image, overlay);
    priceAndStock.append(price, stock);
    productCard.append(imageContainer, brand, title, rating, priceAndStock);

    // Setup Classes
    productCard.classList.add("product-card");
    imageContainer.classList.add("image-container");
    overlay.classList.add("overlay");
    priceAndStock.classList.add("price-stock-wrapper");
    price.classList.add("product-price");
    brand.classList.add("product-brand");
    title.classList.add("product-title");
    rating.classList.add("product-rating");
    stock.classList.add("stock-badge");

    image.src = p.images[0];
    brand.textContent = p.brand || "YH Market";
    title.textContent = p.title;
    price.textContent = `$${p.price}`;
    rating.textContent = ratingToStars(p.rating || 0);

    if (Number(p.stock) > 0) {
      stock.textContent = `Stock: ${p.stock}`;
      stock.classList.add("stock-badge", "in-stock");
    } else {
      stock.textContent = "Out of stock";
      stock.classList.add("stock-badge", "out-stock");
    }

    fragment.appendChild(productCard);
  }
  parent.appendChild(fragment);
}
function priceFilter(link) {
  maxprice = 0;
  minprice = 1000000;

  fetch(link)
    .then((res) => res.json())
    .then((data) => {
      const products = data.products;
      const priceRange = document.getElementById("price-range");

      products.forEach((element) => {
        // console.log(element.price);
        if (element.price > maxprice) {
          maxprice = element.price;
        }
        if (element.price < minprice) {
          minprice = element.price;
        }
      });

      const range = maxprice - minprice;

      priceRange.min = minprice;
      priceRange.max = maxprice;

      let step = Math.ceil(range / 100);

      if (step > 1000) step = Math.round(step / 100) * 100;
      else if (step > 100) step = Math.round(step / 10) * 10;

      priceRange.step = step;

      priceRange.replaceWith(priceRange.cloneNode(true));
      const newPriceRange = document.getElementById("price-range");
      newPriceRange.addEventListener("input", () => {
        priceValue.textContent = `Up to $${newPriceRange.value}`;
        currentprice = newPriceRange.value;

        if (!currentproductsingrid) return;

        const filteredProducts = currentproductsingrid.filter(
          (product) => product.price <= currentprice,
        );

        managePage(filteredProducts);

        parent.innerHTML = "";
        renderProducts(filteredProducts, 0, 9);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}
priceFilter(
  "https://dummyjson.com/products?limit=0&skip=&select=title,price,rating,images,stock,brand",
);

function renderProductsbylink(
  link = "https://dummyjson.com/products?limit=0&skip=&select=title,price,rating,images,stock,brand",
) {
  currentPage = 1;
  fetch(link)
    .then((res) => res.json())
    .then((data) => {
      const products = data.products;
      allProducts = products;
      currentproductsingrid = products;
      managePage(products);
      parent.innerHTML = "";
      renderProducts(products, firstprodindecator, lastprodindecator);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

fetch("https://dummyjson.com/products/category-list")
  .then((res) => res.json())
  .then((data) => {
    const categories = data;
    const categoryContainer = document.getElementById("category-filters");
    const categoryli = document.createElement("li");
    const categoryLink = document.createElement("a");
    categoryLink.href = `#`;
    categoryLink.addEventListener("click", (e) => {
      e.preventDefault();
      renderProductsbylink(
        `https://dummyjson.com/products?limit=0&skip=&select=title,price,rating,images,stock,brand`,
      );
      priceFilter(
        `https://dummyjson.com/products?limit=0&skip=&select=title,price,rating,images,stock,brand`,
      );
    });
    categoryLink.textContent = "All Categories";
    categoryli.appendChild(categoryLink);
    categoryli.classList.add("category-item");
    categoryContainer.appendChild(categoryli);
    categories.forEach((category) => {
      const categoryli = document.createElement("li");
      const categoryLink = document.createElement("a");
      categoryLink.href = `#`;
      categoryLink.addEventListener("click", (e) => {
        currentPage = 1;
        e.preventDefault();
        renderProductsbylink(
          `https://dummyjson.com/products/category/${encodeURIComponent(category)}`,
        );
        priceFilter(
          `https://dummyjson.com/products/category/${encodeURIComponent(category)}`,
        );
      });
      categoryLink.textContent = category;
      categoryli.appendChild(categoryLink);
      categoryli.classList.add("category-item");
      categoryContainer.appendChild(categoryli);
    });
  })
  .catch((error) => {
    console.error("Error fetching categories:", error);
  });

const sortOptions = document.getElementById("sort-options");
sortOptions.addEventListener("change", () => {
  var value = sortOptions.value;
  parent.innerHTML = "";
  sortProducts(value);
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
