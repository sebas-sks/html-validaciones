export function valida(input) {
    const tipoInput = input.dataset.tipo;  
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }  

    console.log(input.parentElement)
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML;
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoInput, input);
    }
}

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo noombre no puede estar vacio"
    },
    email: {
        valueMissing:  "Este campo correo no puede estar vacio",
        typeMismatch:  "El correo no es valido"
    },
    password: {
        valueMissing:  "Este campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing:  "Este campo fecha no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing:  "Este campo número no puede estar vacio",
        patternMismatch: "El formato requerido es xxx xxx xx xx 10 números"
    },
    direccion: {
        valueMissing:  "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 y 40 caracteres"
    },
    ciudad: {
        valueMissing:  "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 4 y 30 caracteres"
    },
    estado: {
        valueMissing:  "Este campo no puede estar vacio",
        patternMismatch: "El estado debe contener entre 4 y 30 caracteres"
    },
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoInput, input) {
    let mensaje = "";
    tipoErrores.forEach(error => {
        if(input.validity[error]){
            console.log(error)
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoInput][error]);
            mensaje = mensajesDeError[tipoInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);    
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );    
    return diferenciaFechas <= fechaActual;
}
