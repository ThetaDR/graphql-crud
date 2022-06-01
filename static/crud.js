const apiUri = 'http://localhost:3000/graphql';

function getProduct() {
    axios
        .get(apiUri, {
            params: {
                query: `{getProduct(id : ${pid.value}) {id price name description}}`,
            },
        })
        .then((result) => {
            displayResult(result.data.data.getProduct);
        })
        .catch((err) => {
            result.style.display = 'none';
            alert('No Result');
            console.log(err);
        });
}

function displayResult(values) {
    price.value = values.price;
    name.value = values.name;
    description.value = values.description;
    updateBt.setAttribute('product-id', values.id);
    result.style.display = 'block';
}

function getAllProducts() {
    axios
        .get(apiUri, {
            params: {
                query: `{getProducts{id name price description}}`,
            },
        })
        .then((result) => result.data.data.getProducts)
        .catch((err) => console.log(err))
        .then((products) => {
            allProducts.innerHTML = products
                .map(
                    (p) =>
                        `<li><b>id</b>: ${p.id} <b>name</b>: ${p.name} <b>price</b>: ${p.price} <b>description</b>: ${p.description} <button class="del" onclick="deleteProduct(this)" product-id="${p.id}">DEL</button>`,
                )
                .join('');
            updated.classList.remove('up');
            void updated.offsetWidth;
            updated.classList.add('up');
        });
}

function postProduct(e) {
    e.preventDefault();
    axios
        .post(apiUri, {
            query: 'mutation addProduct($input: ProductInput) { addProduct(input: $input)}',
            variables: {
                input: {
                    price: parseInt(this.price.value),
                    name: String(this.name.value),
                    description: String(this.description.value),
                },
            },
            operationName: null,
        })
        .then((result) => {
            console.log(result);
            alert(`Added successfully at id ${result.data.data.addProduct}`);
            getAllProducts();
        })
        .catch((err) => {
            console.log(err);
        });
}

function deleteProduct(e) {
    const id = parseInt(e.getAttribute('product-id'));
    axios
        .post(apiUri, {
            query: `mutation deleteProduct{ deleteProduct(id: ${id})}`,
            operationName: null,
        })
        .then((result) => {
            alert(`Deleted successfully at id ${result.data.data.deleteProduct}`);
            getAllProducts();
        })
        .catch((err) => {
            console.log(err);
        });
}

function updateProduct(e) {
    const id = parseInt(e.target.getAttribute('product-id'));
    axios
        .post(apiUri, {
            query:
                'mutation updateProduct($id: ID!, $input: ProductInput!) { updateProduct(id: $id, input: $input)}',
            variables: {
                id,
                input: {
                    price: parseInt(price.value),
                    name: String(name.value),
                    description: String(description.value),
                },
            },
            operationName: null,
        })
        .then((result) => {
            alert(`Updated successfully at id ${result.data.data.updateProduct}`);
            getAllProducts();
        })
        .catch((err) => {
            console.log(err);
        });
}

function searchProducts(value) {
    axios
        .get(apiUri, {
            params: {
                query: `{searchProducts(name: "${value}") {id price name description}}`,
            },
        })
        .then((result) => result.data.data.searchProducts)
        .catch((err) => {
            console.log(err);
        })
        .then((products) => {
            results.innerHTML = products
                .map(
                    (p) =>
                        `<li><b>id</b>: ${p.id} <b>name</b>: ${p.name} <b>price</b>: ${p.price} <b>description</b>: ${p.description}`,
                )
                .join('');
        });
}

function initProduct() {
    axios
        .post(apiUri, {
            query: 'mutation initProduct { initProduct }',
            operationName: null,
        })
        .then((result) => {
            alert('Data is set by default');
            getAllProducts();
        })
        .catch((err) => {
            console.log(err);
        });
}
