const products=[
    {id :1, name:"Product 1",price:34, status:"pending"},
    {id :2, name:"Product 2",price:24,  status:"pending"},
    {id :3, name:"Product 3",price:44,  status:"pending"},
];

const newPrice=products.map((value) => ({ ...value,price:value.price+5,status:value.status="Completed"}));
 

products.forEach((product)=> console.log(`name:${product.name}, Price:${product.price}, Status:${product.status}`));