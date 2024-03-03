// Precios de los productos
const prices = {
    product1: 10,
    product2: 20,
    product3: 30
  };
  
  // Supongamos que hay un descuento si el total supera $50
  const discountM = 50;
  const discountR = 0.1; // Descuento del 10%
  
  function calculateTotalCost() {
    // Obtener las cantidades de cada producto del formulario
    let cantidades = {
      product1: parseInt(document.getElementById('product1').value) || 0,
      product2: parseInt(document.getElementById('product2').value) || 0,
      product3: parseInt(document.getElementById('product3').value) || 0,
    };
  
    // Calcular el costo total usando un ciclo
    let total = 0;
    for (let product in cantidades) {
      total += cantidades[product] * prices[product];
    }
  
    // Aplicar descuento si el total supera el umbral establecido
    if (total > discountM) {
      total *= (1 - discountR);
    }
  
    // Mostrar el costo total en la página
    document.getElementById('totalCost').textContent = `Costo Total: $${total.toFixed(2)}`;
  }
  