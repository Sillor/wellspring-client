export default async function login(){
    fetch('http://152.44.224.138:5174/login',{
        method: 'POST',
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify({username: "admintest", password: "admintest2"})
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

