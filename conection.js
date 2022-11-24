let url = "https://fakestoreapi.com/products";
const productos = document.getElementById('productos');
const frag = document.createDocumentFragment();
let carrito = {};

$.get(url , function(respuesta){
    const data = respuesta;
    console.log(data);
        PrintCard(data);
},"json");

const PrintCard = data => {
    const template = document.getElementById("tem-productos").content
    data.forEach(item => {
        template.querySelector('h5').textContent = item.title;
        template.querySelector('p').textContent = item.price;
        template.querySelector('img').setAttribute('src', item.image);
        template.querySelector('button').dataset.id = item.id;
        const clone = template.cloneNode(true);
        frag.appendChild(clone);
    })
    productos.appendChild(frag);
}