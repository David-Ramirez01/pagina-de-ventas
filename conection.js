let url = "https://fakestoreapi.com/products";
const productos = document.getElementById('productos');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const frag = document.createDocumentFragment();
const templateItems = document.getElementById("t-carrito").content
const templateTotal = document.getElementById("t-total").content
let carrito = {};

productos.addEventListener('click', e => {Addcarito(e)})
items.addEventListener('click', e => {btnAgregarEliminar(e)})

$.get(url , function(respuesta){
    const data = respuesta;
        PrintCard(data);
},"json");

const PrintCard = data => {
    const template = document.getElementById("tem-productos").content
    data.forEach(item => {
        template.querySelector('h6').textContent = item.title;
        template.querySelector('span').textContent = item.price;
        template.querySelector('img').setAttribute('src', item.image);
        template.querySelector('button').dataset.id = item.id;
        const clone = template.cloneNode(true);
        frag.appendChild(clone);
    })
    productos.appendChild(frag);
}

const Addcarito = e => {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement);
    }
}

const setCarrito = item => {
    const productos = {
        id: item.querySelector('button').dataset.id,
        precio: item.querySelector('span').textContent,
        titulo: item.querySelector('h6').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(productos.id)){
        productos.cantidad = carrito[productos.id].cantidad + 1
    }
    carrito[productos.id] = {...productos}
    pintarCar();
}


const pintarCar = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(productos => {
        templateItems.querySelector('th').textContent= productos.id;
        templateItems.querySelectorAll('td')[0].textContent= productos.titulo;
        templateItems.querySelectorAll('td')[1].textContent= productos.cantidad;
        templateItems.querySelector('span').textContent= productos.precio * productos.cantidad;

        templateItems.querySelector('.btn-info').dataset.id = productos.id;
        templateItems.querySelector('.btn-danger').dataset.id = productos.id;

        const Clone = templateItems.cloneNode(true);
        frag.appendChild(Clone);
    })
    items.appendChild(frag);
    setTotal();
}

const setTotal = () => {
    footer.innerHTML = ''
    if (Object.values(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">No hay elementos en el carrito </th>
        `
        return
    }
    const cantidad_item = Object.values(carrito).reduce((acc , {cantidad}) => acc + cantidad , 0);
    const valor = Object.values(carrito).reduce((acc , {cantidad , precio}) => acc + cantidad * precio , 0);

    templateTotal.querySelectorAll('td')[0].textContent= cantidad_item
    templateTotal.querySelectorAll('span')[0].textContent = valor

    const Clone = templateTotal.cloneNode(true);
    frag.appendChild(Clone);
    items.appendChild(frag);

    const boton = document.getElementById('Vaciar-todo')
    boton.addEventListener('click', () =>{
        carrito = {}
        pintarCar()
    })
}

const btnAgregarEliminar = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad ++
        carrito[e.target.dataset.id] = {...producto}
        pintarCar();
    }
    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad --
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }else{
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCar();
    }
}