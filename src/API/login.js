import alertMessage from "@/components/alert";
import getUser from "./getusers";
import storageUser from "@/data/localstorage";

export default function login() {
    const submitBtn = document.querySelector('#form-modal #submit_login');

    submitBtn.onclick = async function (e) {
        e.preventDefault();

        const username = document.querySelector('#form-modal .login-area input[name="username"]').value;
        const passWord = document.querySelector('#form-modal .login-area input[name="password"]').value;
        const [user] = await getUser(username, passWord);
        if (user) {
            storageUser.SET_localstorage({
                id: user.id,
                username: user.username,
                cart: user.cart
            })
            if (user.username == 'administrator') {
                location.href = '/admin';
            } else location.reload();
        }
        else {
            alertMessage('Fail', 'incorrect Username or Password')
        }
    }
}