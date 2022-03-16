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
        console.log(response)
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
            window.location.assign("perfil.html")
            return data
        }else{
            console.log('erro')
        }
    }
}