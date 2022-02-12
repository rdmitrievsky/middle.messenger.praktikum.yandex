modalControl = (buttonId, modalData, closeModal) => {
    let button = document.getElementById(buttonId)
    let modal = document.getElementById('modal')
    let buttonApply = document.getElementById(closeModal)
    button.addEventListener('click', () => {
        if (modal.dataset.modal === modalData) {
            modal.classList.add('modal_visible')
        }
    })
    modal.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'modal') {
            modal.classList.remove('modal_visible')
        }
    })
    buttonApply.addEventListener('click', () => {
        modal.classList.remove('modal_visible')
    })
}
export default modalControl