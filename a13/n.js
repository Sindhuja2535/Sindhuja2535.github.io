let fruits = [
  { id: 1, name: "Apple", price: 250 , status : "pending" },
  { id: 2, name: "Orange", price: 100, status : "pending"  },
  { id: 3, name: "Mango", price: 80 , status : "pending" },
];

let updatedFruits = fruits.map(element => ({...element , price : element.price+5 , status : "completed"}));
 

updatedFruits.forEach(element => {
  console.log(element.price+" "+element.status);
})
