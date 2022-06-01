const allProducts = document.querySelector('#allProducts');
const updated = document.querySelector('#updated');
getAllProducts(); 

const pid = document.querySelector('#pid');
const result = document.querySelector('#result');
const price = document.querySelector('#price');
const name = document.querySelector('#name');
const description = document.querySelector('#description');
const getBt = document.querySelector('#get');
getBt.addEventListener('click', getProduct);

const postForm = document.querySelector('form');
postForm.addEventListener('submit', postProduct);


const updateBt = document.querySelector('#update');
updateBt.addEventListener('click', updateProduct);

const results = document.querySelector('#results');
const searchName = document.querySelector('#searchName');
searchName.addEventListener('keyup', (e) => {
    searchProducts(e.target.value.toLowerCase());
});


const set = document.querySelector('#set');
set.addEventListener('click', initProduct);


document.querySelector('#ref').addEventListener('click', getAllProducts);
