let menuIcono = getId("main__topBar-toggle");
let menuHeightBar = getClase(".main__topBar");
let containerMenu = getClase(".container__menu");
let main = getClase(".main");
let cambiaTema = getClase(".cambio__tema");
let body = getClase("body");
let btnSubir = getClase(".btn__subir");
let form = getId("form");
let inputs = getAllClass("#form input");
let textArea = getId("contacto__textArea");

/*==> OBJETO CON EXPRESIONES REGULARES <==*/

const expresiones = {
  // usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  // password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^\d{7,14}$/, // 7 a 14 numeros.
};

/*==> OBJETO PARA VALIDA QUE TODOS LOS CAMPOS ESTÉN CORRECTOS <==*/

const campos = {
  nombre: false,
  apellido: false,
  email: false,
  phone: false,
  mensaje: false,
};

/*==> VALIDACIONES DEL FORMULARIO <==*/

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "apellido":
      validarCampo(expresiones.nombre, e.target, "apellido");
      break;
    case "email":
      validarCampo(expresiones.correo, e.target, "email");
      break;
    case "phone":
      validarCampo(expresiones.phone, e.target, "phone");
      break;
  }
};

/*==> VALIDAR CAMPOS <==*/

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`contacto__${campo}`)
      .classList.remove("incorrecto");
    document.getElementById(`contacto__${campo}`).classList.add("correcto");
    campos[campo] = true;
  } else {
    document.getElementById(`contacto__${campo}`).classList.add("incorrecto");
    document.getElementById(`contacto__${campo}`).classList.remove("correcto");
    campos[campo] = false;
  }
};

/*==> VALIDAR TEXTAREA <==*/

textArea.addEventListener("blur", (e) => {
  if (e.target.value <= 0) {
    document.getElementById("contacto__textArea").classList.remove("correcto");
    document.getElementById("contacto__textArea").classList.add("incorrecto");
    campos["mensaje"] = false;
  } else {
    document.getElementById("contacto__textArea").classList.add("correcto");
    document
      .getElementById("contacto__textArea")
      .classList.remove("incorrecto");
    campos["mensaje"] = true;
  }
});

/*==> RECORRE CADA UNO DE LOS INPUTS Y VERIFICA LA TECLA PRESIONADA <==*/
/*==> Y SI HACE CLICK FUERA DE LOS INPUTS PARA VALIDAR EL CAMPO <==*/

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

/*==> VALIDACIÓN AL PRESIONAR EL BOTÓN DE ENVIAR FORMULARIO <==*/

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (campos.nombre && campos.apellido && campos.email && campos.phone && campos.mensaje) {
    textArea.classList.remove("correcto");
    inputs.forEach((input) => {
      input.classList.remove("correcto");
    });
    form.reset();
    document.querySelector(".contacto__msg-exito").style.display = "block";
    document.querySelector(".contacto__msg-error").style.display = "none";
    setTimeout(() => {
      document.querySelector(".contacto__msg-exito").style.display = "none";
    }, 3000);
  } else {
    document.querySelector(".contacto__msg-error").style.display = "block";
  }
});

/*==> BOTÓN SUBIR <==*/

window.addEventListener("scroll", () => {
  btnSubir.classList.toggle("mostrar", window.scrollY >= 688);
});

/*==> MENU DESPLEGABLE <==*/

menuIcono.addEventListener("click", () => {
  menuIcono.classList.toggle("active");
  menuHeightBar.classList.toggle("active");
  containerMenu.classList.toggle("active");
  main.classList.toggle("active");
});

/*==> FUNCIONES <==*/

cambiaTema.addEventListener("click", () => {
  body.classList.toggle("dark");
});

function despliegaMenu() {
  containerMenu.classList.remove("active");
  main.classList.remove("active");
}

function getClase(nameClase) {
  return document.querySelector(nameClase);
}

function getAllClass(nameClase) {
  return document.querySelectorAll(nameClase);
}

function getId(nameId) {
  return document.getElementById(nameId);
}
