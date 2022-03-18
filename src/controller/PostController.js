import { User } from "../User.js"

export class PostController{
    static token    = localStorage.getItem('token')
    static postArea = document.getElementById('post--area')

    static async listarPost (pagina){
        this.postArea.innerHTML = ''
        const p = document.querySelector('.pagina--atual')
        const postPage = await User.getPost(this.token,pagina)
        console.log(postPage)
        const {data} = postPage
        
        p.innerText = postPage.page
        data.forEach(posts => {
            const {id,createdAt,owner,post,updatedAt} = posts
            const {avatarUrl, username} = owner
            const li = document.createElement('li')
            li.classList.add("post")
            li.innerHTML = `
            <div class="foto--post">
                <img src="${avatarUrl}" alt="foto-de-perfil">
                </div>
            <div class="post--content--container">
                <h1 class="nome--post">${username}</h1>
                <p class="post--content">
                    ${post}
                </p>
            </div>
            <div class="detalhes">
                <button class="editar--post">Editar</button>
                <button class="apagar--post">Apagar</button>
                <span class="data--post">${createdAt}</span>
            </div>
            `
           
            this.postArea.appendChild(li)
        });
       
    }

}