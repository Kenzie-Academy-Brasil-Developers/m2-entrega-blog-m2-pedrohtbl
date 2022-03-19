import { User } from "../User.js"

export class PerfilController{
    static token      = localStorage.getItem('token')
    static userId     = sessionStorage.getItem('userId')
    static postArea   = document.getElementById('post--area')
    static foto       = document.getElementById('foto--perfil')
    static nome       = document.getElementById('nome--user')
    static novoPost   = document.getElementById('novo--post')
    static btnPost    = document.getElementById('add--post')
    static deletaPost = document.querySelector('.apagar--post')
    static logout     = document.getElementById('logout')

    static async dadosPerfil (){
       const user =  await User.getUser(this.userId, this.token)    
       this.nome.innerText = user.username
       this.foto.src = user.avatarUrl
    }

    static async listarPost (pagina){
        this.postArea.innerHTML = ''
        const p = document.querySelector('.pagina--atual')
        const postPage = await User.getPost(this.token,pagina)
        const {data} = postPage
        
        p.innerText = postPage.page
        data.forEach(posts => {
            const {id: postId, createdAt,owner,post,updatedAt} = posts
            const {avatarUrl, username,id} = owner
            const li = document.createElement('li')
            li.classList.add("post")
            li.id = postId
            li.innerHTML = `
            <div class="foto--post">
                <img src="${avatarUrl}" alt="foto-de-perfil">
                </div>
            <div class="post--content--container">
                <h1 class="nome--post">${username}</h1>
                <div class="post--content">
                    ${post}
                </div>
            </div>
            <div class="detalhes">
                <span class="data--post">${createdAt}</span>
            </div>
            `
            this.postArea.appendChild(li)

            if(id === this.userId){
                this.detalhes(createdAt,postId)
                this.apagaPost(postId)
                this.atualizaPost(postId)
            }
            
        });
       
    }

    static detalhes (createdAt,postId) {
        const post         = document.getElementById(`${postId}`)
        let detalhes       = post.children[2]
        detalhes.innerHTML = `
        <button class="editar--post">Editar</button>
        <button class="apagar--post">Apagar</button>
        <span class="data--post">${createdAt}</span>
        `
       
    }

    static criaPost (){
        this.btnPost.addEventListener('click', async (event)=>{
            const content = {content : this.novoPost.value}
            const post = await User.criaPost(this.token,content)
            this.novoPost.value= ''
            this.listarPost(1)
        })
    }

    static apagaPost (postId){
        const post = document.getElementById(`${postId}`)
        if(post){
            post.addEventListener('click', async (event)=>{
                if(event.target.className === 'apagar--post'){
                   const apaga =  await User.apagaPost(this.token,postId)
                   this.listarPost(1)
                }
            })
        }
    }

    static atualizaPost (postId){
        const post = document.getElementById(`${postId}`)
        if(post){
            post.addEventListener('click', (event)=>{
                if(event.target.className === 'editar--post'){
                    const input  = document.createElement('input')
                    const button = document.createElement('button')
                    const button2 = document.createElement('button')
                    const novaDiv = document.createElement('div')

                    input.classList.add('input')
                    button.classList.add('fechar')
                    button.innerText = 'X'
                    button2.classList.add('ok')
                    button2.innerText = 'V'
                    let div     = post.children[1].children[1]
                    let texto = div.textContent
                    div.textContent = ''
                    div.appendChild(input)
                    div.appendChild(novaDiv)
                    novaDiv.appendChild(button)
                    novaDiv.appendChild(button2)
                    novaDiv.addEventListener('click', async (event) =>{
                        if(event.target.className === 'fechar'){
                            div.innerHTML = ''
                            div.textContent = texto
                        }
                        if(event.target.className === 'ok'){
                            let conteudo = {newContent:input.value}
                            const atualiza =  await User.atualizaPost(this.token,postId,conteudo)
                            this.listarPost(1)
                        }
                    })
                   
                }
            })
        }
    }

    static logOut (){
        this.logout.addEventListener('click', (event)=>{
            sessionStorage.clear()
        })
    }
}