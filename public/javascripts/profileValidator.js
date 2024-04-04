console.log("edit user validator success!!");

const exRegEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const $ = (id) => document.getElementById(id);
let buttonEyeClicked = false;

const ClassesInvalid = function (input, msgError) {
const inputLabel = document.querySelector(`label[for=${input.id}]`);

inputLabel.classList.add("invalidForm--label");
input.classList.add("invalidForm");

$(`error-${input.id}`).innerHTML = msgError;
$(`error-${input.id}`).style.visibility = "visible";
};


for (let i = 0; i < $("form-edit-user").elements.length - 3; i++) {
    const inputName = $("form-edit-user").elements[i].name;

    $(inputName).addEventListener("focus", function () {
        const inputLabel = document.querySelector(`label[for=${this.id}]`);
        
        this.classList.remove("invalidForm");
        inputLabel.classList.remove("invalidForm--label");
        $(`error-${this.id}`).style.visibility = "hidden";
    });
}

// Name validation
$("name").addEventListener("blur", function () {
    if (!this.value) {
        ClassesInvalid(this, "El nombre es obligatorio :/");
    } else if (this.value.length < 3) {
        ClassesInvalid(this, "Mínimo 3 caracteres");
    }
});

// Surname validation
$("surname").addEventListener("blur", function () {
    if (!this.value) {
        ClassesInvalid(this, "El apellido es obligatorio :/");
    } else if (this.value.length < 3) {
        ClassesInvalid(this, "Mínimo 3 caracteres");
    }
});

// Email validation
$("email").addEventListener("blur", function () {
    if (!this.value) {
        ClassesInvalid(this, "El email es obligatorio :/");
    } else if (!exRegEmail.test(this.value)) {
        ClassesInvalid(this, "No es un formato de email válido");
    }
});

// Teléfono validation
$("phone").addEventListener("blur", function () {
    if (!this.value) {
        ClassesInvalid(this, "El teléfono es obligatorio :/");
    } else if (!/^\d+$/.test(this.value)) {
        ClassesInvalid(this, "El teléfono solo debe contener números");
    }
});

// Nuevo controlador de eventos para eliminar clases de estilo de error cuando el campo de teléfono obtiene el enfoque
$("phone").addEventListener("focus", function () {
    const inputLabel = document.querySelector(`label[for=${this.id}]`);
    this.classList.remove("invalidForm");
    inputLabel.classList.remove("invalidForm--label");
    $(`error-${this.id}`).style.visibility = "hidden";
});


const validateEditUserForm = () => {
    let isValid = true;

    const name = $("name").value;
        if (!name || name.length < 3) {
            ClassesInvalid($("name"), "El nombre es obligatorio (mínimo 3 caracteres)");
            isValid = false;
        }

    const surname = $("surname").value;
        if (!surname || surname.length < 3) {
            ClassesInvalid($("surname"), "El apellido es obligatorio (mínimo 3 caracteres)");
            isValid = false;
        }

    const email = $("email").value;
        if (!email || !exRegEmail.test(email)) {
            ClassesInvalid($("email"), "El email es obligatorio y debe tener un formato válido");
            isValid = false;
        }

    const phone = $("phone").value;
        if (!phone) {
            ClassesInvalid($("phone"), "El teléfono es obligatorio");
            isValid = false;
        } else if (!/^\d+$/.test(phone)) {
            ClassesInvalid($("phone"), "El teléfono solo debe contener números");
            isValid = false;
        }
    return isValid;
};


$("form-edit-user").addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateEditUserForm()) {
        this.submit();
    } else {
        $("msg-error").hidden = false;
    }
});
