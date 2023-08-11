import { v4 as uuidv4 } from "uuid";
import addUser from "./adduser";
import getUser from "./getusers";
import storage from "@/data/localstorage";
import alertMessage from "@/components/alert";

const notEmpty = function () {
    return {
        errorMessage(value) {
            return value.trim() == '' ? 'Field cannot be empty' : undefined;
        }
    }
}
const minLength = function () {
    return {
        errorMessage(value) {
            return value.trim().length < 8 ? 'Min 8 chars' : undefined;
        }
    }
}
const isEmail = function () {
    const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
        errorMessage(value) {
            return Regex.test(value) ? undefined : 'Email invalid';
        }
    }
}
const confimPassword = function () {
    return {
        errorMessage(value) {
            const password = document.querySelector('#form-modal .register-area input[name="password"]').value;
            return value == password ? undefined : 'Password and Confirm Password do not match';
        }
    }
}

export default async function register() {
    const registerBtn = document.querySelector('#form-modal #submit_register');

    const username = document.querySelector('#form-modal .register-area input[name="username"]');
    const email = document.querySelector('#form-modal .register-area input[name="email"]');
    const password = document.querySelector('#form-modal .register-area input[name="password"]');
    const rePassword = document.querySelector('#form-modal .register-area input[name="re-password"]');
    const rules = {
        'username': [
            notEmpty(),
            minLength()
        ],
        'email': [
            notEmpty(),
            isEmail()
        ],
        'password': [
            notEmpty(),
            minLength()
        ],
        'rePassword': [
            notEmpty(),
            confimPassword()
        ]
    };
    const selector = {
        'username': username,
        'email': email,
        'password': password,
        'rePassword': rePassword
    };
    
    function validate(key) {
        const errorBox = selector[key].parentElement.querySelector('.error');
        let isValidate = true;
        for (const rule of rules[key]) {
            const message = rule.errorMessage(selector[key].value);
            if (message) {
                errorBox.innerText = message;
                isValidate = false;
                break;
            } else errorBox.innerText = '';
        }
        return isValidate;
    }
    // oninput validate
    for(const key in selector){
        selector[key].addEventListener('input',function(){
            validate(key);
        })
    }
    // submit validate
    registerBtn.onclick = async function (e) {
        e.preventDefault();
        let isValid = true;
        for (const key in selector) {
            let temp = validate(key);
            if(!temp) isValid = false;
        }
        if(isValid){
            // get user and compare
            const [user] = await getUser(username.value);
            if(!user){
                let data = {
                    id: uuidv4(),
                    username: username.value,
                    email: email.value,
                    password: password.value,
                }
                addUser(data);
                storage.SET_localstorage({
                    username: data.username
                });
                alertMessage('Success','Sign up Successful')
                setTimeout(function(){
                    location.reload();
                },1000)
            }else alertMessage('Fail','Username already exists')
        }
    }

}