var data = [1, 2, 4, 5];

localStorage.setItem("cart", JSON.stringify(data));

// console.log(localStorage.getItem("cart"));

var lop = JSON.parse(localStorage.getItem("cart"));

lop.push(1);



lop.forEach((element) => {
  console.log(element);
});
