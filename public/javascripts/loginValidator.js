console.log("login validator success!");
const $ = (id) => document.getElementById(id);

    //añade las clases que marcan los errores
const ClassesInvalid = function(input, msgError) {
        input.previousElementSibling.classList.add('invalidForm--label')
        input.classList.add('invalidForm')
        $(`error-${input.id}`).innerHTML = msgError
        $(`error-${input.id}`).style.visibility = "visible"
}
    
//Quita el color rojo de los campos y labels en foco
for (let i = 0; i < $('form-login').elements.length - 3; i++) {
    
    const inputName = $('form-login').elements[i].name;
    
    $(inputName).addEventListener("focus", function () {
   
    this.classList.remove('invalidForm')
    this.previousElementSibling.classList.remove('invalidForm--label')
    $(`error-${this.id}`).innerHTML = "no small"
    $(`error-${this.id}`).style.visibility = "hidden"
    });
}


//email
$("email").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            ClassesInvalid(this);
            $('error-email').innerHTML = "El email es obligatorio"
            break;
        case !exRegEmail.test(this.value):
            ClassesInvalid(this);
            $('error-email').innerHTML = "El mail tiene un formato inválido"
            break;
        case checkEmail(this.value):
            ClassesInvalid(this);
            $('error-email').innerHTML = "El mail tiene un formato inválido"
            break;
    }
});

//password
$("password").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            ClassesInvalid(this);
            $('error-password').innerHTML = "La contraseña es obligatoria"
            break;
        case this.value.length < 8:
            ClassesInvalid(this);
            $('error-password').innerHTML = "Mínimo 3 caracteres"
            break;
        case this.value.length > 12:
            ClassesInvalid(this);
            $('error-password').innerHTML = "Maximo 12 caracteres"
            break;
    }
});

$("form-login").addEventListener("submit", function (e) {
  e.preventDefault();

  let error = false;

  for (let i = 0; i < this.elements.length - 2; i++) {
    if (!this.elements[i].value) {
      error = true;
      this.elements[i].classList.add("invalidForm");
      this.elements[i].previousElementSibling.classList.add(
        "invalidForm--label"
      );
    }
  }
  
if (!error) {
    this.onsubmit()
}else{
    $('msg-error').hidden = false
}
   
});




