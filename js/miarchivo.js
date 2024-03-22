
const productos = [
  { nombre: "Producto 1", precio: 10 },
  { nombre: "Producto 2", precio: 20 },
  { nombre: "Producto 3", precio: 30 }
];

const descuentouno = 50;
const descuentodos = 0.1;

function calculateTotalCost() {
  
  let cantidades = productos.map((producto) => {
    let cantidad = parseInt(prompt(`Ingrese la cantidad para ${producto.nombre} ($${producto.precio}):`)) || 0;
    return { ...producto, cantidad };
  });

  
  let total = cantidades.reduce((acc, { cantidad, precio }) => acc + (cantidad * precio), 0);

  
  if (total > descuentouno) {
    total -= total * descuentodos;
  }

  alert(`Costo Total: $${total.toFixed(2)}`);
}

calculateTotalCost();
