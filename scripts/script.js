import {cards} from "./cards.js";

cards.getContent();

document.addEventListener('click',function (e) {
    let targetClick = e.target;
    if (targetClick.classList.contains('quantityPlus')) {
        let idThisInput = cards.getId(targetClick);
        document.getElementById(idThisInput + 'IN').value++;
    }
    if (targetClick.classList.contains('quantity-')) {
        let idThisInput = cards.getId(targetClick);
        document.getElementById(idThisInput + 'IN').value--;
        if (document.getElementById(idThisInput + 'IN').value < 1) {
            document.getElementById(idThisInput + 'IN').value = 1;
        }
    }
});