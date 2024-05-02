export default async function login(){
    fetch('https://wellspring.azurewebsites.net/login',{
        method: 'POST',
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify({username: "admin", password: "admin123"})
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.message === 'success'){
            localStorage.setItem('token', data.token)
            console.log('yes')
        }
        else{
           // alert('fart fart')
        }
    })
}

