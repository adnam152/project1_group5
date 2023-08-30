const KEY = 'WORKSHOP_USER';
const storageUser = {
    GET_localstorage() {
        return JSON.parse(localStorage.getItem(KEY));
    },
    SET_localstorage(data) {
        localStorage.setItem(KEY, JSON.stringify(data));
    },
    REMOVE_localstorage(){
        localStorage.removeItem(KEY);
    }
}
export default storageUser