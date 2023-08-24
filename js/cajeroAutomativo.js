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

document.addEventListener("DOMContentLoaded", () => {
  const selectUsuarios = document.getElementById("usuarios");
  const passwordInput = document.getElementById("passwordInput");
  const passwordField = document.getElementById("passwordField");
  const submitPasswordButton = document.getElementById("submitPasswordButton");
  const resultado = document.getElementById("resultado");
  const validacionContrasenia = document.getElementById(
    "validacionContrasenia"
  );
  const opcionesSelect = document.getElementById("opcionesSelect");
  const seSelecciono = document.getElementById("seSelecciono");
  const mostrarNombre = document.getElementById("mostrarNombre");
  const accion = document.getElementById("accion");
  const pasoParaAccion = document.getElementById("pasoParaAccion");
  const consultarSaldo = document.getElementById("consultarSaldo");
  const myModal = new mdb.Modal(document.getElementById("modalConsultarSaldo"));
  //para mostrar todos los usuarios en el select e ir pintandolos en el Dom
  usuarios.forEach((usuario) => {
    const option = document.createElement("option");
    option.value = usuario.id;
    option.textContent = usuario.nombre;
    selectUsuarios.appendChild(option);
  });

  //este evento onchange es para poder mostrar junto con el resultado lo que seleccione en el select
  selectUsuarios.addEventListener("change", () => {
    const usuarioSeleccionado = usuarios.value;
    mostrarNombre.style.display = "block";
    resultado.textContent =
      usuarioSeleccionado !== ""
        ? usuarioSeleccionado
        : `Has elegido a: ${usuarioSeleccionado}`;
  });

  let seleccionado;
  selectUsuarios.addEventListener("change", () => {
    const seleccionadoId = parseInt(selectUsuarios.value);
    //estamos comparando el id de cada usuario con seleccionadoId
    seleccionado = usuarios.find((usuario) => usuario.id === seleccionadoId);
    resultado.textContent = seleccionado ? seleccionado.nombre : "";
    if (seleccionado && seleccionado.contrasenia) {
      passwordInput.style.display = "block";
    } else {
      passwordInput.style.display = "none"; // Oculta el campo de contraseña
      validacionContrasenia.textContent = ""; // Limpia el mensaje de validación
    }
  });

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
      //Opciones
      const opciones = ["Consultar saldo", "Ingresar monto", "Retirar monto"];
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

      opcionesSelect.addEventListener("change", () => {
        const opcionSeleccionada = opcionesSelect.value;
        seSelecciono.style.display = "block";
        seSelecciono.textContent =
          opcionSeleccionada !== ""
            ? `Opción seleccionada: ${opcionSeleccionada}`
            : "";

        if (opcionSeleccionada === "Consultar saldo") {
          if (seleccionado) {
            consultarSaldo.textContent = `Saldo actual de ${seleccionado.nombre}: $${seleccionado.saldo}`;
            myModal.show();
            
          }
        } else {
          consultarSaldo.textContent = ""; // Limpia el resultado si no es "Consultar saldo"
        }
      });
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
    }
  });
});
