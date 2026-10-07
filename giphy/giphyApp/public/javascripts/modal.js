var modalEle = document.querySelector(".modal");


function showModal(errTxt) {
    modalEle.classList.add("modal--show");
}

function hideModal() {
    modalEle.classList.remove("modal--show");
}

window.addEventListener("click", function(ev) {
    hideModal();
})