// Selectores
const datosPersonales = document.querySelector('.personales__formulario');
const escolaridad = document.querySelector('.escolaridad__formulario');
const intereses = document.querySelector('.intereses__formulario');
const avance = document.querySelector('.contenido__avance')
const iconos = document.querySelectorAll('.contenido__icono');
const fin = document.querySelector('.contenido__fin');
let iconoActivo = 0;

const divAlerta = document.querySelector('.contenido__alerta');
// Event Listeners
window.onload = ()=>{
    datosPersonales.addEventListener('submit', validarDatos);
    escolaridad.classList.add('hidden');
    intereses.classList.add('hidden');
    fin.classList.add('hidden');
    escolaridad.addEventListener('submit', validarEscolaridad);
    intereses.addEventListener('submit', validarIntereses);
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
    mostrarAlerta('success', 'Enviando Formulario...', document.querySelector('.contenido__alerta'));
    mostrarAnimacion(datosPersonales, escolaridad);
}

// Finción que valida el fomulario de Escolaridad
function validarEscolaridad(e){
    e.preventDefault();
    const carreraInput = document.querySelector('#carrera');
    const universidadInput = document.querySelector('#universidad');
    const duracionInput = document.querySelector('#duracion');
    if(carreraInput.value === '' || universidadInput.value === '' || duracionInput.value === ''){
        mostrarAlerta('error','Todos los campos son obligatorios');
        return;
    }
    mostrarAlerta('success', 'Enviando Datos...');
    mostrarAnimacion(escolaridad, intereses);
}
// Funcion para validad el formulario de Intereses
function validarIntereses(e){
    e.preventDefault();
    const deportistaInput = document.querySelector('#deportista');
    const artistaInput = document.querySelector('#artista');
    const deporteInput = document.querySelector('#deporte');
    if(deporteInput.value === '' || artistaInput.value === '' || deportistaInput.value === ''){
        mostrarAlerta('error', 'Todos los campos son obligatorios');
        return;
    }
    mostrarAlerta('success', 'Formulario Completado');
    mostrarAnimacion(intereses, fin);
    document.querySelector('.contenido__progreso').classList.add('hidden');
}

// Función que muestra las animaciones
function mostrarAnimacion(formularioActual, formularioSiguiente){
    iconoActivo++;
    setTimeout(() => {
        formularioActual.reset();
        gsap.from(formularioActual, {opacity: 1, duration: 1, y: 100});
        formularioActual.classList.add('hidden');
        formularioSiguiente.classList.remove('hidden');
        gsap.from(formularioSiguiente, {opacity: 0, duration: 1, y: 100});
        iconos[iconoActivo].classList.add('contenido__icono-activo');
        if(iconoActivo === 2){
            avance.style.width = iconoActivo * 42 + "%";
        }else{
            avance.style.width = iconoActivo * 50 + "%";
        }
    }, 3000);
}

// Función que muestra alertas
function mostrarAlerta(tipo, mensaje){
    const errores = document.querySelectorAll('.error');
    const success = document.querySelectorAll('.success');
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
// Función que borra las clases de activo
function borrarClases(){
    iconos.forEach((icono, idx) => {
        if(iconoActivo != 0){
            icono.classList.remove('contenido__avance');
            icono.classList.remove('contenido__icono-activo');
        }
    })
    iconoActivo = 0;
}