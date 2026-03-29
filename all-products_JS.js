// fetch('https://dummyjson.com/products')
// .then(res => res.json())
// .then(console.log);
// fetch('https://dummyjson.com/products/categories')
// .then(res => res.json())
// .then(console.log);

// fetch('https://dummyjson.com/products/category-list')
// .then(res => res.json())
// .then(console.log);

function ratingToStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
    return '★'.repeat(fullStars) + (halfStar ? '⯪' : '') + '☆'.repeat(emptyStars);
}

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    const products = data.products;

    var firstprodindecator = 0;
    var lastprodindecator = 9;
    var currentPage ;
    const totalPages = Math.ceil(products.length / 9);

    const parantofpagination = document.getElementById("pagination-info");
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      pageBtn.classList.add("pagination-btn");
      pageBtn.setAttribute("id", i);
      parantofpagination.appendChild(pageBtn);
      pageBtn.addEventListener("click", () => {
        currentPage = i;
        firstprodindecator = (i - 1) * 9;
        lastprodindecator = i * 9;
        parent.innerHTML = "";
        renderProducts();
      });     
    }   
    
    const nextPageBtn = document.getElementById("next-page");
    nextPageBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        firstprodindecator = (currentPage - 1) * 9;
        lastprodindecator = currentPage * 9;
        parent.innerHTML = "";
        renderProducts();
      }
    });
    const prevPageBtn = document.getElementById("prev-page");
    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        firstprodindecator = (currentPage - 1) * 9;
        lastprodindecator = currentPage * 9;
        parent.innerHTML = "";
        renderProducts();
      }
    });


    const parent = document.getElementById("product-grid");
    renderProducts();
    function renderProducts() {
    for (let i = firstprodindecator; i < lastprodindecator && i < products.length; i++) {
      const p = products[i];
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
        productCard.append(imageContainer, brand, title,  rating, priceAndStock);


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




        // Populate Data
        image.src = p.images[0];
        brand.textContent = "YH Market";
        title.textContent = p.title;
        price.textContent = `$${p.price}`;
        rating.textContent = ratingToStars(p.rating);
        if (Number(p.stock) > 0) {
            stock.textContent = `Stock: ${p.stock}`;
            stock.classList.add("stock-badge", "in-stock");
          } else {
            stock.textContent = "Out of stock";
            stock.classList.add("stock-badge", "out-stock");
          }
 
    parent.appendChild(productCard);
    }
}

  })
  .catch((error) => {
    // It is always a good idea to catch network errors!
    console.error("Error fetching products:", error);
  }

);

fetch('https://dummyjson.com/products/category-list')
.then(res => res.json())
 .then((data) => {
    const categories = data;
    const categoryContainer = document.getElementById("category-filters");
    console.log(categories);
    categories.forEach(category => {
        const categoryli = document.createElement("li");
        const categoryLink = document.createElement("a");
        categoryLink.href = `all-products.html?category=${encodeURIComponent(category)}`;
        categoryLink.textContent = category;
        categoryli.appendChild(categoryLink);
        categoryli.classList.add("category-item");
        categoryContainer.appendChild(categoryli);
    });



 })
 .catch((error) => {
    // It is always a good idea to catch network errors!
    console.error("Error fetching categories:", error);
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