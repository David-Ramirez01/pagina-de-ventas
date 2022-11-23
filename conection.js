

let url = "https://fakestoreapi.com/products";
$.get(url , function(respuesta){
    respuesta.forEach(function(item) {
        console.log(item);
    });
},"json");