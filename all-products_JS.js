// fetch('https://dummyjson.com/products')
// .then(res => res.json())
// .then(console.log);
// fetch('https://dummyjson.com/products/categories')
// .then(res => res.json())
// .then(console.log);

const priceValue = document.getElementById("price-range-value");
const parent = document.getElementById("product-grid");

var maxprice = 0;
var minprice = 1000000;
var currentprice = 0;
var currentproductsingrid ;

  function renderProducts(pp = products ,firstprodindecator , lastprodindecator ) {

    for (let i = firstprodindecator; i < lastprodindecator && i < pp.length; i++) {
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

fetch('https://dummyjson.com/products?limit=0&skip=&select=title,price,rateing,images')
.then(res => res.json())
.then((data) => {
    const products = data.products;

    products.forEach(element => {
        // console.log(element.price);
        if (element.price > maxprice) {
            maxprice = element.price;
        }
        if (element.price < minprice) {
            minprice = element.price;
        }
    });

    const priceRange = document.getElementById("price-range");
    priceRange.min = minprice;
    priceRange.max = maxprice;
    priceRange.addEventListener("input", () => {
        priceValue.textContent = `Up to $${priceRange.value}`;
        currentprice = priceRange.value;
        const filteredProducts = currentproductsingrid.filter(product => product.price <= currentprice);
        // console.log(filteredProducts);
        parent.innerHTML = "";
        renderProducts(filteredProducts, 0, 9);

    });
   
    

})
.catch((error) => {
    // It is always a good idea to catch network errors!
    console.error("Error fetching products:", error);
  });


//main code
renderProductsbylink();
//end of main code
// Function to convert numeric rating to star representation
function ratingToStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
    return '★'.repeat(fullStars) + (halfStar ? '⯪' : '') + '☆'.repeat(emptyStars);
}
// Function to fetch and render products based on the provided link
function renderProductsbylink( link = "https://dummyjson.com/products?limit=0&skip=&select=title,price,rateing,images") {

fetch(link)
  .then((res) => res.json())
  .then((data) => {
    const products = data.products;
    currentproductsingrid = products;
    var firstprodindecator = 0;
    var lastprodindecator = 9;
    var currentPage ;
    const totalPages = Math.ceil(products.length / 9);

    const parantofpagination = document.getElementById("pagination-info");
    parantofpagination.innerHTML = "";
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
        renderProducts(products, firstprodindecator, lastprodindecator);
      });     
    }   
    
    const nextPageBtn = document.getElementById("next-page");
    nextPageBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        firstprodindecator = (currentPage - 1) * 9;
        lastprodindecator = currentPage * 9;
        parent.innerHTML = "";
        renderProducts(products, firstprodindecator, lastprodindecator);
      }
    });
    const prevPageBtn = document.getElementById("prev-page");
    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        firstprodindecator = (currentPage - 1) * 9;
        lastprodindecator = currentPage * 9;
        parent.innerHTML = "";
        renderProducts(products, firstprodindecator, lastprodindecator);
      }
    });
    parent.innerHTML = "";
    renderProducts(products, firstprodindecator, lastprodindecator);

//     function renderProducts(pp = products ,firstprodindecator , lastprodindecator ) {
//     for (let i = firstprodindecator; i < lastprodindecator && i < pp.length; i++) {
//       const p = pp[i];
//         // Create Elements
//         const productCard = document.createElement("div");
//         const imageContainer = document.createElement("div");
//         const image = document.createElement("img");
//         const overlay = document.createElement("div");
//         const brand = document.createElement("span");
//         const title = document.createElement("h5");
//         const priceAndStock = document.createElement("div");
//         const stock = document.createElement("div");
//         const price = document.createElement("div");
//         const rating = document.createElement("div");

//         imageContainer.append(image, overlay);
//         priceAndStock.append(price, stock);
//         productCard.append(imageContainer, brand, title,  rating, priceAndStock);


//         // Setup Classes
//         productCard.classList.add("product-card");
//         imageContainer.classList.add("image-container");
//         overlay.classList.add("overlay");
//         priceAndStock.classList.add("price-stock-wrapper");
//         price.classList.add("product-price");
//         brand.classList.add("product-brand");
//         title.classList.add("product-title");
//         rating.classList.add("product-rating");
//         stock.classList.add("stock-badge");




//         // Populate Data
//         image.src = p.images[0];
//         brand.textContent = "YH Market";
//         title.textContent = p.title;
//         price.textContent = `$${p.price}`;
//         rating.textContent = ratingToStars(p.rating);
//         if (Number(p.stock) > 0) {
//             stock.textContent = `Stock: ${p.stock}`;
//             stock.classList.add("stock-badge", "in-stock");
//           } else {
//             stock.textContent = "Out of stock";
//             stock.classList.add("stock-badge", "out-stock");
//           }
 
//     parent.appendChild(productCard);
//     }
// }

  })
  .catch((error) => {
    // It is always a good idea to catch network errors!
    console.error("Error fetching products:", error);
  }

);
}
// Fetch categories and populate the category filter
fetch('https://dummyjson.com/products/category-list')
.then(res => res.json())
 .then((data) => {
    const categories = data;
    const categoryContainer = document.getElementById("category-filters");
    const categoryli = document.createElement("li");
    const categoryLink = document.createElement("a");
    categoryLink.href = `#`;
    categoryLink.addEventListener("click", (e) => {
        e.preventDefault();
        renderProductsbylink(`https://dummyjson.com/products?limit=0&skip=&select=title,price,rateing,images`);
    });
    categoryLink.textContent = "All Categories";
    categoryli.appendChild(categoryLink);
    categoryli.classList.add("category-item");
    categoryContainer.appendChild(categoryli);
    categories.forEach(category => {
        const categoryli = document.createElement("li");
        const categoryLink = document.createElement("a");
        categoryLink.href = `#`;
        categoryLink.addEventListener("click", (e) => {
            e.preventDefault();
            renderProductsbylink(`https://dummyjson.com/products/category/${encodeURIComponent(category)}`);
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