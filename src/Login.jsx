import './output.css'; 
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();

    function login(username,password){
        fetch('http://152.44.224.138:5174/login',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify({username: username, password: password})
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.message === 'success'){
                localStorage.clear();
                localStorage.setItem('token', data.token)
                localStorage.setItem('user',username)


                navigate('/main', 
                        {
                            state: {
                                user: document.getElementById('emailAddress').value,
                            }
                        })
            }
            else{
                alert("Invalid username or password")
            }
        })
    }
    
    return (
        <div>
            <div className="bg-teal-600">
                <h1 className="text-6xl block text-left text-bg text-white font-semibold">WellSpring</h1>
            </div>
            <div className="flex justify-center items-center h-screen bg-teal-600">
                <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                    <h1 className="text-3xl block text-teal-800 text-center font-semibold"><i className="fa-solid fa-user-doctor"></i> Login</h1>
                    <hr className="mt-3" />
                    <div className="mt-6">
                        <label htmlFor="email address" className="block text-base mb-2 text-teal-800 font-semibold">Username</label>
                        <input type="text" id="emailAddress" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter Username..." />
                    </div>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label htmlFor="password" className="block text-base mb-2 text-teal-800 font-semibold">Password</label>
                        <input type="password" id="password" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter Password..." />
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div>
                            <input type="checkbox" />
                            <label className="text-teal-600 font-sans">Remember Me?</label>
                        </div>
                        <div>
                            <a href="#" className="text text-teal-800 hover:bg-transparent hover:text-red-400 font-semibold">Forgot Password?</a>
                        </div>
                    </div>
                    <div className="mt-7">
                        <button type="submit" id="loginBtn" className="border-1 border-l-teal-500 bg-teal-500 text-white py-1 w-full rounded-md hover:bg-teal-800 hover:text-white font-semibold" onClick={() => { login(document.getElementById('emailAddress').value, document.getElementById('password').value)}}>Login</button>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="border-1 border-teal-600 bg-gray-300 text-teal-600 py-1 min-w-full rounded-md hover:bg-teal-200 hover:text-teal-800 font-semibold" onClick={() => {navigate('/createuser')}}>Create Account</button>
                    </div>
                    <div className="mt-5">
                        <h1 className="text-1x2 text-center text-bg text-teal-800 font-semibold">WellSpring</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
