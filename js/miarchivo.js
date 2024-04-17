async function cargarProductos() {
  try {
    const respuesta = await fetch('/js/productos.json');
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    }
    const productos = await respuesta.json();
    mostrarProductos(productos);
  } catch (e) {
    console.error('No se pudieron cargar los productos:', e);
    alert('No se pudieron cargar los productos: ' + e); 
  }
}

function mostrarProductos(productos) {
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

  document.getElementById('calculateBtn').addEventListener('click', (event) => calculateTotalCost(productos, event));
}

function calculateTotalCost(productos, event) {
  event.preventDefault();

  let total = productos.reduce((acc, producto) => {
    const cantidad = parseInt(document.getElementById(producto.nombre.replace(/\s+/g, '')).value) || 0;
    return acc + (cantidad * producto.precio);
  }, 0);

  const descuentouno = 50;
  const descuentodos = 0.1;

  if (total > descuentouno) {
    total -= total * descuentodos;
  }

  localStorage.setItem('totalCost', total);
  document.getElementById('totalCostDisplay').textContent = `Costo Total: $${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', cargarProductos);
