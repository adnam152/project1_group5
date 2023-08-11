import alertMessage from "@/components/alert";
import getUser from "./getusers";
import storage from "@/data/localstorage";

export default function login(){
    const submitBtn = document.querySelector('#form-modal #submit_login');

    submitBtn.onclick = async function(e){
        e.preventDefault();

        const username = document.querySelector('#form-modal .login-area input[name="username"]').value;
        const passWord = document.querySelector('#form-modal .login-area input[name="password"]').value;
        const [user] = await getUser(username,passWord);

        if(user){
            storage.SET_localstorage({
                username: user.username
            })
            if(user.username == 'administrator'){
                location.href = 'http://localhost:5173/admin';
            }else location.reload();
        }
        else{
            alertMessage('Fail', 'incorrect Username or Password')
        }
    }
}