import { User } from "../User.js"

export class LoginController{
    static formLogin = document.getElementById('form--login')

    static async login () {
        this.formLogin.addEventListener('click', (event)=>{
            const form = event.target.closest('form')
            let login = {}
            if(event.target.tagName === 'A'){
                for (let i = 0; i < form.length; i++){
                    login[form[i].name] = form[i].value
                }
                User.login('login', login)
            }
        })
    }
}