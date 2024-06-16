const form = document.querySelector('.form');
const formArr = Array.from(form.elements);
const validFormArr = formArr.filter(el => el.hasAttribute("data-reg"));
const button = form.elements["button"];

validFormArr.forEach(el => el.setAttribute("is-valid", "0"));

form.addEventListener("input", inputHandler);
form.addEventListener("submit", formCheck);

function inputHandler({ target }) {
    if (target.hasAttribute("data-reg")) {
        inputCheck(target);
    }
}

function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("data-reg");
    const reg = new RegExp(inputReg);
    if (reg.test(inputValue)) {
        el.setAttribute("is-valid", "1");
        el.style.border = "2px solid rgb(0, 196, 0)";
    } else {
        el.setAttribute("is-valid", "0");
        el.style.border = "2px solid rgb(255, 0, 0)";
    }
}


function serializeForm(formNode) {
    return new FormData(formNode);
}

function formReset() {
    form.reset();
    validFormArr.forEach(el => {
        el.setAttribute("is-valid", "0");
        el.style.border = "none";
    });
}
