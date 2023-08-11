import Navigo from "navigo";

const router = new Navigo('/', {linksSelector: 'a'})
const render = function(target, component){
    target.innerHTML = component();
}
const app = document.querySelector('#app');

export {render, router, app};
