let cola = [];
let turno = 1;
const LIMITE_COLA = 10; // Límite de la cola

const agregarBtn = document.getElementById('agregar');
const atenderBtn = document.getElementById('atender');
const salirBtn = document.getElementById('salir');
const colaClientes = document.getElementById('colaClientes').getElementsByTagName('tbody')[0];
const turnoInput = document.getElementById('turno');
const nombreInput = document.getElementById('nombre');
const movimientoSelect = document.getElementById('movimiento');
const frenteSpan = document.getElementById('frente');
const finalSpan = document.getElementById('final');

// Proteger la página para que solo usuarios logueados puedan acceder
document.addEventListener('DOMContentLoaded', function() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    window.location.href = 'login.html'; // Redirigir al login si no está logueado
  }
});

function actualizarTurno() {
  turnoInput.value = turno;
}

function actualizarFrenteFinal() {
  frenteSpan.textContent = cola.length > 0 ? cola[0].turno : '-';
  finalSpan.textContent = cola.length > 0 ? cola[cola.length - 1].turno : '-';
}

function agregarCliente() {
  if (cola.length >= LIMITE_COLA) {
    alert('La cola está llena, no se pueden agregar más clientes.');
    return;
  }

  const nombre = nombreInput.value.trim();
  const movimiento = movimientoSelect.value;

  if (nombre === '' || movimiento === '') {
    alert('Por favor, completa todos los campos.');
    return;
  }

  const horaLlegada = new Date().toLocaleTimeString();
  const cliente = {
    turno,
    nombre,
    movimiento,
    horaLlegada
  };

  cola.push(cliente);
  turno++;

  agregarClienteTabla(cliente);
  actualizarTurno();
  actualizarFrenteFinal();

  alert(`Cliente formado en la Cola:\n\nNo Turno: ${cliente.turno}\nNombre: ${cliente.nombre}\nTipo de Movimiento: ${cliente.movimiento}\nHora de llegada: ${cliente.horaLlegada}`);

  // Limpiar campos
  nombreInput.value = '';
  movimientoSelect.value = '';
}

function agregarClienteTabla(cliente) {
  const fila = colaClientes.insertRow();
  fila.insertCell(0).textContent = cliente.turno;
  fila.insertCell(1).textContent = cliente.nombre;
  fila.insertCell(2).textContent = cliente.movimiento;
  fila.insertCell(3).textContent = cliente.horaLlegada;
}

function atenderCliente() {
  if (cola.length === 0) {
    alert('No hay clientes en la cola.');
    return;
  }

  const clienteAtendido = cola.shift();
  const horaAtencion = new Date().toLocaleTimeString();
  const tiempoEspera = calcularTiempoEspera(clienteAtendido.horaLlegada, horaAtencion);

  alert(`Cliente atendido:\n\nNo Turno: ${clienteAtendido.turno}\nNombre: ${clienteAtendido.nombre}\nTipo de Movimiento: ${clienteAtendido.movimiento}\nHora de llegada: ${clienteAtendido.horaLlegada}\nHora de atención: ${horaAtencion}\nTiempo en espera: ${tiempoEspera} minutos`);

  // Actualizar tabla
  colaClientes.deleteRow(0);
  actualizarFrenteFinal();
}

function calcularTiempoEspera(horaLlegada, horaAtencion) {
  const [horaLleg, minLleg] = horaLlegada.split(':').map(Number);
  const [horaAtenc, minAtenc] = horaAtencion.split(':').map(Number);
  return (horaAtenc - horaLleg) * 60 + (minAtenc - minLleg);
}

// Agregar funcionalidad de salida del sistema
salirBtn.addEventListener('click', () => {
  if (window.confirm("¿Estás seguro de que deseas salir del sistema?")) {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
  }
});

agregarBtn.addEventListener('click', agregarCliente);
atenderBtn.addEventListener('click', atenderCliente);

actualizarTurno();
