const button = document.getElementById('changeAvatar')
const modal = document.getElementById('modal')
const buttonApply = document.getElementById('applyAvatar')
button.addEventListener('click', () => {
    if (modal.dataset.modal === 'change-avatar') {
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
console.log('asd')