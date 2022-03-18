export class User{
    static path = 'https://api-blog-m2.herokuapp.com/user/'

    static async cadastro (path,user){
            
        const response = await fetch(`${this.path}${path}`,{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify(user)  
            })
            if(response.ok){
                window.location.assign("login.html")
            }else{
                console.log('erro')
            }       
    }

    static async login (path,user){
        
        const response = await fetch(`${this.path}${path}`,{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify(user)  
        })
        const data = await response.json()
        if(response.ok){
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.userId)
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('userId', data.userId)
            window.location.assign("perfil.html")
            return data
        }else{
            console.log('erro')
        }
    }

    static async getPost (token,pagina){
        const response = await fetch (`https://api-blog-m2.herokuapp.com/post?page=${pagina}`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }  
        })
        const data = await response.json()
        
        return data
    }
}