export default function alertMessage(type, message) {
    const alert = document.querySelector('#alert');

    let toast = document.createElement('div');
    toast.classList.add('toast', `toast--${type}`);
    let icon = 'fa-check';
    if(type == 'Adding') icon = 'fa-spinner';
    else if(type == 'Warning') icon = 'fa-exclamation';

    toast.innerHTML = `
        <div class="icon">
            <i class="fa-solid ${icon}"></i>
        </div>
        <div class="message">
            <div class="title">${type}</div>
            <p>${message}</p>
        </div>
        <div class="close"><i class="fa-solid fa-x"></i></div>
        `;
    alert.appendChild(toast);
    toast.addEventListener('animationend', function () {
        alert.removeChild(this);
    })
}