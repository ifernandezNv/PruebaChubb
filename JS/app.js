// Selectores
const datosPersonales = document.querySelector('.personales__formulario');
const escolaridad = document.querySelector('.escolaridad__formulario');
const intereses = document.querySelector('.intereses__formulario');

const divAlerta = document.querySelector('.contenido__alerta');
// Event Listeners
window.onload = ()=>{
    datosPersonales.addEventListener('submit', validarDatos);
    escolaridad.classList.add('hidden');
    intereses.classList.add('hidden');
    gsap.from(datosPersonales, {opacity: 0, duration: 1, y: -100});
}

// Funciones
// Función que valida el formulario de datos personales
function validarDatos(e){
    e.preventDefault();
    const inputNombre = document.querySelector('#nombre');
    const inputApellido = document.querySelector('#apellido');
    const inputEmail = document.querySelector('#email');
    if(inputNombre.value === '' || inputApellido.value === '' || inputEmail.value === ''){
        mostrarAlerta('error', 'Todos los campos son obligatorios', document.querySelector('.contenido__alerta'))
        return;
    }
    mostrarAlerta('success', 'Enviando Formulario', document.querySelector('.contenido__alerta'));
    setTimeout(() => {
        datosPersonales.reset();
        gsap.from(datosPersonales, {opacity: 1, duration: 1, y: 100});
        datosPersonales.classList.add('hidden');
        escolaridad.classList.remove('hidden');
        gsap.from(escolaridad, {opacity: 0, duration: 1, y: 100});
    }, 3000);
    
}

// Función que muestra el siguiente formulario
function mostrarSiguienteFormulario(){
    console.log('Mostrando siguiente formulario');
}

// Función que muestra alertas
function mostrarAlerta(tipo, mensaje){
    const errores = document.querySelectorAll('error');
    const success = document.querySelectorAll('success');
    if(errores.length === 0 && success.length === 0){
        const alerta = document.createElement('p');
        alerta.classList.add('alerta');
        alerta.textContent = mensaje;
        if(tipo === 'error'){
            alerta.classList.add('error');
            alerta.classList.remove('success');
        }else{
            alerta.classList.remove('error');
            alerta.classList.add('success');
        }
        divAlerta.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
        return;
    }

}