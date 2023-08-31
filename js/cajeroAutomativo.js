class Usuario {
  constructor(id, nombre, saldo, contrasenia) {
    (this.id = id),
      (this.nombre = nombre),
      (this.saldo = saldo),
      (this.contrasenia = contrasenia);
  }
}

let usuarios = [
  new Usuario(
    (id = 1),
    (nombre = "Mali"),
    (saldo = 200),
    (contrasenia = "mali44")
  ),
  new Usuario(
    (id = 2),
    (nombre = "Gera"),
    (saldo = 290),
    (contrasenia = "gera45")
  ),
  new Usuario(
    (id = 3),
    (nombre = "Maui"),
    (saldo = 67),
    (contrasenia = "maui46")
  ),
];

const selectUsuarios = document.getElementById("usuarios");
const passwordInput = document.getElementById("passwordInput");
const passwordField = document.getElementById("passwordField");
const submitPasswordButton = document.getElementById("submitPasswordButton");
const resultado = document.getElementById("resultado");
const validacionContrasenia = document.getElementById("validacionContrasenia");
const opcionesSelect = document.getElementById("opcionesSelect");
const seSelecciono = document.getElementById("seSelecciono");
const mostrarNombre = document.getElementById("mostrarNombre");
const accion = document.getElementById("accion");
const pasoParaAccion = document.getElementById("pasoParaAccion");
const consultarSaldo = document.getElementById("consultarSaldo");
const myModal = new bootstrap.Modal(
  document.getElementById("modalConsultarSaldo")
);
const aceptarAccion = document.getElementById("aceptarAccion");
const montoInput = document.getElementById("montoInput");
const ingresarCantidad = document.getElementById("ingresarCantidad");
const saldoIngresado = document.getElementById("saldoIngresado");
const info = document.getElementById("info");
const montoMaximo = 990;
const montoMinimo = 10;
let seleccionado;
let opcionSeleccionada;
const opciones = ["Consultar saldo", "Ingresar monto", "Retirar monto"];
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(
  document.getElementById("liveToast")
);
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

document.addEventListener("DOMContentLoaded", () => {
  //para mostrar todos los usuarios en el select e ir pintandolos en el Dom
  usuarios.forEach((usuario) => {
    const option = document.createElement("option");
    option.value = usuario.id;
    option.textContent = usuario.nombre;
    selectUsuarios.appendChild(option);
  });
  eventos();
  //contraseña
  submitPasswordButton.addEventListener("click", () => {
    const enteredPassword = passwordField.value;
    if (seleccionado && seleccionado.contrasenia === enteredPassword) {
      validacionContrasenia.textContent = `Contraseña correcta. ¡Bienvenido, ${seleccionado.nombre}!`;
      passwordField.classList.add("is-valid");
      passwordField.classList.remove("is-invalid");
      // Deshabilitar los elementos
      selectUsuarios.disabled = true;
      passwordField.disabled = true;
      submitPasswordButton.disabled = true;
      opcionesSelect.innerHTML = ""; //limpia las opciones anteriores
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "Selecciona una opcion";
      opcionesSelect.appendChild(option);
      //Agregar las demas opciones
      opciones.forEach((opcion) => {
        const option = document.createElement("option");
        option.value = opcion;
        option.textContent = opcion;
        opcionesSelect.appendChild(option);
      });
      aceptarAccion.style.display = "block";
      //se muestran cuando si coincide la contraseña paso a paso
      accion.style.display = "block";
      pasoParaAccion.style.display = "block";
      opcionesSelect.style.display = "block";
    } else {
      validacionContrasenia.textContent =
        " Contraseña incorrecta. Inténtalo de nuevo.";
      passwordField.classList.add("is-invalid");
      passwordField.classList.remove("is-valid");
      opcionesSelect.style.display = "none";
      seSelecciono.style.display = "none";
      accion.style.display = "none";
      info.classList.add("d-none");
    }
  });
});

function consultaSaldo() {
  consultarSaldo.textContent = `Saldo actual de ${seleccionado.nombre}: $${seleccionado.saldo}`;
  myModal.show();
}

function ingresarSaldo() {
  seleccionado.saldo += parseFloat(montoInput.value);
  //para limpiar el input cuando tenga valor
  saldoIngresado.style.display = "block";
  saldoIngresado.textContent = `Tu saldo ingresado fué de: $${montoInput.value}`;
  montoInput.value = "";
  consultaSaldo();
}

function retirarSaldo() {
  seleccionado.saldo -= parseFloat(montoInput.value);
  //para limpiar el input cuando tenga valor
  saldoIngresado.style.display = "block";
  saldoIngresado.textContent = `Tu saldo retirado fué de: $${montoInput.value}`;
  montoInput.value = "";
  consultaSaldo();
}

function realizarAccion() {
  opcionSeleccionada = opcionesSelect.value;
  seSelecciono.style.display = "block";
  seSelecciono.textContent =
    opcionSeleccionada !== ""
      ? `Opción seleccionada: ${opcionSeleccionada}`
      : "";
  //VALIDACION DE OPCIONES DEL SEGUNDO SELECT
  if (opcionSeleccionada === "Consultar saldo") {
    montoInput.style.display = "none";
    ingresarCantidad.style.display = "none";
    info.classList.add("d-none");
    consultaSaldo();
  } else if (opcionSeleccionada === "Ingresar monto") {
    montoInput.style.display = "block";
    info.classList.remove("d-none");
  } else if (opcionSeleccionada === "Retirar monto") {
    montoInput.style.display = "block";
    info.classList.remove("d-none");
  }
}

function eventos() {
  selectUsuarios.addEventListener("change", () => {
    const seleccionadoId = parseInt(selectUsuarios.value);
    //estamos comparando el id de cada usuario con seleccionadoId
    seleccionado = usuarios.find((usuario) => usuario.id === seleccionadoId);
    resultado.textContent = seleccionado ? seleccionado.nombre : "";
    mostrarNombre.style.display = "block";
    if (seleccionado && seleccionado.contrasenia) {
      passwordInput.style.display = "block";
    } else {
      passwordInput.style.display = "none"; // Oculta el campo de contraseña
      validacionContrasenia.textContent = ""; // Limpia el mensaje de validación
    }
  });

  montoInput.addEventListener("input", (e) => {
    const regex = /^(?!0\d)\d*\.?\d*$/;
    let montoPermitido = 0;
    if (opcionSeleccionada === "Ingresar monto") {
      montoPermitido = montoMaximo - seleccionado.saldo;
    } else {
      montoPermitido = seleccionado.saldo - montoMinimo;
    }
    // Verifica si el valor ingresado no coincide con la expresión regular o es mayor al monto permitido.
    if (
      (!regex.test(montoInput.value) && montoInput.value !== "0.") ||
      parseFloat(montoInput.value) > montoPermitido
    ) {
       // Si el valor no es válido, establece el valor del input en un valor anterior o vacío.
      montoInput.value =
        montoPermitido <= 0 ? "" : e.target._previousValue || "";
         // Si el monto permitido es menor o igual a cero, muestra una notificación
      if (montoPermitido <= 0) {
        toastBootstrap.show();
      }
    } else if (montoInput.value === "") {
      ingresarCantidad.style.display = "none";
    } else {
      // Si el valor es válido, guarda el valor anterior y muestra un elemento (ingresarCantidad)
      e.target._previousValue = montoInput.value;
      ingresarCantidad.style.display = "block";
    }
  });

  //En resumen, este fragmento de código garantiza que solo se ingresen caracteres numéricos, el punto decimal y algunas teclas de control específicas en el campo de entrada montoInput, y evita que otros caracteres sean ingresados.
  montoInput.addEventListener("keydown", (e) => {
    //Verifica si la tecla presionada está en la lista de teclas permitidas.
    if (
      ![
        "Digit0",
        "Digit1",
        "Digit2",
        "Digit3",
        "Digit4",
        "Digit5",
        "Digit6",
        "Digit7",
        "Digit8",
        "Digit9",
        "Period",
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
      ].includes(e.code)
    ) {
      // Si la tecla no está en la lista permitida, evita su comportamiento predeterminado.
      e.preventDefault();
    }
    // Solo permite un punto decimal
    if (e.code === "Period" && montoInput.value.includes(".")) {
      e.preventDefault();
    }
    // Prevenir que el primer dígito sea cero si no es seguido por un punto
    if (e.code === "Digit0" && montoInput.value.length === 0 && e.key !== ".") {
      e.preventDefault();
    }
  });

  opcionesSelect.addEventListener("change", () => {
    realizarAccion();
  });

  aceptarAccion.addEventListener("click", (e) => {
    realizarAccion()
  })

  ingresarCantidad.addEventListener("click", () => {
    if (montoInput.value !== "") {
      if (opcionSeleccionada === "Ingresar monto") {
        ingresarSaldo();
      } else {
        retirarSaldo();
      }
    }
    montoInput.value = "";
  });

  myModal -
addEventListener("hide.bs.modal", () => {
      saldoIngresado.style.display = "none";
    });
}
