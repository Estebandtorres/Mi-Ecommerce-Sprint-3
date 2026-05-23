
const formulario = document.getElementById('formularioRegistro');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const password2Input = document.getElementById('password2');


formulario.addEventListener('submit', function (evento) {

    evento.preventDefault();

    const nombreValor = nombreInput.value.trim();
    const apellidoValor = apellidoInput.value.trim();
    const emailValor = emailInput.value.trim();
    const passwordValor = passwordInput.value;
    const password2Valor = password2Input.value;   

    if (nombreValor === '') {
        alert("Por favor, ingresa tu nombre.");
    } else if (apellidoValor === '') {
        alert("Por favor, ingresa tu apellido.");
    } else if (emailValor === '') {
        alert("Por favor, ingresa tu email.");
    } else if (passwordValor.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
    } else if (!/[a-zA-Z]/.test(passwordValor)) {
        alert("La contraseña debe contener al menos una letra.");
    } else if (!/[0-9]/.test(passwordValor)) {
        alert("La contraseña debe contener al menos un número.");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValor)) {
        alert("La contraseña debe contener al menos un carácter especial.");    
    } else if (!/[password]/.test(passwordValor.toLowerCase())) {
        alert("La contraseña no puede contener la palabra 'password'."); 
    } else if (!/[1234]/.test(passwordValor)) {
        alert("La contraseña no puede contener secuencias comunes como '1234'.");
    }else if (!/[qwerty]/.test(passwordValor.toLowerCase())) {
        alert("La contraseña no puede contener la palabra 'qwerty'.");
    } else if (!/[sporting]/.test(passwordValor.toLowerCase())) {
        alert("La contraseña no puede contener el nombre del sitio.");  
    } else if (!/[nombreValor]/.test(passwordValor.toLowerCase())) {
        alert("La contraseña no puede contener tu nombre.");    
    } else if (passwordValor !== password2Valor) {
        alert("Las contraseñas no coinciden.");
    } else {
        formulario.submit();
    }
});