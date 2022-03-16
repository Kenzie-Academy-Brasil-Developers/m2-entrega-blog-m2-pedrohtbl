import { User } from "../User.js"

export class CadastroController {
    static form = document.getElementById('form--cadastro')

    static novoUsuario (){
        this.form.addEventListener('click', (event) =>{
            let user ={}
            const form = event.target.closest('form')
            if(event.target.tagName === 'A'){
                for(let i = 0; i<form.length; i++){
                    user[form[i].name] = form[i].value
                }
                User.cadastro('register', user)
            }
        })
    }
}