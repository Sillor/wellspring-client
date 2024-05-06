export default async function login(user,pass){

    fetch('http://152.44.224.138:5174/login',{
        method: 'POST',
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify({username: user, password: pass})
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.message === 'success'){
            localStorage.setItem('token', data.token)
        }
        else{
        //
        }
    })
}

