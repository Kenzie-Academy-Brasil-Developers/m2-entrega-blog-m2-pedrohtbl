import { PostController } from "./controller/PostController.js";
import { User } from "./User.js";

const pagina = document.querySelector('.paginacao--container')
const p = document.querySelector('.pagina--atual')
let postPage = await User.getPost(localStorage.token,1)
let pageAtual  = postPage.page
let proximaPage  = postPage.nextPage.replace('page=','')
let pageAnterior = postPage.previousPage
if(postPage.previousPage){
    pageAnterior  = postPage.previousPage.replace('page=','')
}

if(sessionStorage.getItem('token')){
    PostController.listarPost('1')
}else{
    window.location.assign("login.html")
}

pagina.addEventListener('click',async (event)=>{
    const btn = event.target
        if(btn.id === 'proxima--page'){
            PostController.listarPost(proximaPage)
            postPage = await User.getPost(localStorage.token,proximaPage)
            proximaPage = postPage.nextPage.replace('page=','')
            pageAnterior  = postPage.previousPage.replace('page=','')
            pageAtual  = postPage.page

        }
        if(btn.id === 'page--anterior'){
            if(pageAnterior){
                PostController.listarPost(pageAnterior)
                postPage = await User.getPost(localStorage.token,pageAnterior)
                proximaPage = postPage.nextPage.replace('page=','')
                if(postPage.previousPage){
                    pageAnterior  = postPage.previousPage.replace('page=','')
                }else{
                    pageAnterior = postPage.previousPage
                }
                pageAtual  = postPage.page
            }
        }
})
