export default function renameTitle(title){
    const titleBox = document.querySelector('head title');
    titleBox.innerHTML = title;
}