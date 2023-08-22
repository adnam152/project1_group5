import getData from "@/API/getdata";
import login from "@/API/login";
import register from "@/API/register";

export default function loginForm() {
    (async () => {
        const GET_img = await getData({
            category: 'form'
        })
        const [linkImg] = GET_img;

        const regBtn = document.getElementById('reg');
        const logBtn = document.getElementById('log');
        const form = document.querySelector('#form-modal .container');
        const img = form.querySelector('img');
        const area = form.querySelector('.container-area');
        const registerArea = form.querySelector('.register-area');
        const loginArea = form.querySelector('.login-area');
        img.src = linkImg.galeryImage[0]

        regBtn.onclick = function () {
            img.style.left = -area.offsetWidth + 'px';
            area.style.left = img.offsetWidth + 'px';
            registerArea.style.display = 'block';
            loginArea.style.opacity = 0;
        }

        logBtn.onclick = function () {
            img.style.left = 0;
            area.style.left = 0;
            loginArea.style.opacity = 1;
            registerArea.style.display = 'none';
        };
        // password group
        const passwordGroup = form.querySelectorAll('.password-group');
        passwordGroup.forEach(group => {
            group.onclick = function (e) {
                const iTag = group.querySelectorAll('i');
                const inputTag = group.querySelector('input');
                if (e.target.tagName == 'I') {
                    iTag.forEach(item => item.classList.toggle('active'));
                    inputTag.type = group.querySelector('i.show.active') ? 'text' : 'password';
                }
                inputTag.oninput = function () {
                    this.type = group.querySelector('i.show.active') ? 'text' : 'password';
                }
            }
        })
        // login - register
        login();
        register();
    })();
    return `
    <div id="form-modal">
        <div class="container">
            <div class="container-area">
            <!-- Login -->
            <form action="" method="post" class="login-area">
                <h1>Login</h1>
                <p>If You Are Already A Member. Easily Log In</p>
                <div>
                    <input type="text" name="username" placeholder="Username">
                    <div class="error"></div>
                </div>
                <div class="password-group">
                    <div>
                        <input type="password" name="password" placeholder="Password" autocomplete="on">
                        <div class="error"></div>
                    </div>
                    <i class="fa-regular fa-eye-slash active hide"></i>
                    <i class="fa-regular fa-eye show"></i>
                </div>
                <button id="submit_login">Login</button>
                <div class="or">
                    <div class="line"></div>Or<div class="line"></div>
                </div>
                <button class="google-login">
                    <i class="fa-brands fa-google" style="color: #1f2e51;"></i> Login with Google
                </button>
                <p>Forgot my password?</p>
                <div class="line"></div>
                <p>If you don't have an Account, Create <button type="button" id="reg">Register</button></p>
            </form>

            <!-- Register -->
            <form action="" method="post" class="register-area">
                <h1>Register</h1>
                <p>Become a member to receive many Benefits</p>
                <div>
                    <input type="text" name="username" placeholder="Username">
                    <div class="error"></div>
                </div>
                <div>
                    <input type="email" name="email" placeholder="Email">
                    <div class="error"></div>
                </div>
                <div class="password-group">
                    <div>
                        <input type="password" name="password" placeholder="Password" autocomplete="on">
                        <div class="error"></div>
                    </div>
                    <i class="fa-regular fa-eye-slash active hide"></i>
                    <i class="fa-regular fa-eye show"></i>
                </div>
                <div class="password-group">
                    <div>
                        <input type="password" name="re-password" placeholder="Confirm Password" autocomplete="on">
                        <div class="error"></div>
                    </div>
                    <i class="fa-regular fa-eye-slash active hide"></i>
                    <i class="fa-regular fa-eye show"></i>
                </div>
                <p class="terms-check">By clicking Signup, you agree to the <span class="terms">Terms and Conditions.</span>
                </p>
                <button id="submit_register">Sign Up</button>
                <div class="line"></div>
                <p>If you already have an Account, Login <button type="button" id="log">Login</button></p>
            </form>
            </div>
            <img src="" alt="">
        </div>
    </div>
    
    `
}