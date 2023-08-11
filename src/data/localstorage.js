const KEY = 'WORKSHOP_USER';
const storage = {
    GET_localstorage() {
        return JSON.parse(localStorage.getItem(KEY));
    },
    SET_localstorage(user) {
        localStorage.setItem(KEY, JSON.stringify(user));
    },
    REMOVE_localstorage(){
        localStorage.removeItem(KEY);
    }
}
export default storage