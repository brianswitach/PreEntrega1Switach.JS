const productos = [
  { nombre: "Producto 1", precio: 10 },
  { nombre: "Producto 2", precio: 20 },
  { nombre: "Producto 3", precio: 30 }
];

const descuentouno = 50;
const descuentodos = 0.1;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('productForm');
  productos.forEach(producto => {
    const label = document.createElement('label');
    label.textContent = `${producto.nombre} ($${producto.precio}): `;
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.value = '0';
    input.id = producto.nombre.replace(/\s+/g, '');
    label.appendChild(input);
    form.appendChild(label);
  });

  document.getElementById('calculateBtn').addEventListener('click', calculateTotalCost);
});

function calculateTotalCost(event) {
  event.preventDefault();

  let total = productos.reduce((acc, producto) => {
    const cantidad = parseInt(document.getElementById(producto.nombre.replace(/\s+/g, '')).value) || 0;
    return acc + (cantidad * producto.precio);
  }, 0);

  if (total > descuentouno) {
    total -= total * descuentodos;
  }

  localStorage.setItem('totalCost', total);
  document.getElementById('totalCostDisplay').textContent = `Costo Total: $${total.toFixed(2)}`;
}
