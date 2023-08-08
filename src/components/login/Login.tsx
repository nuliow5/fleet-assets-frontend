import React, {useRef, useState, useEffect} from 'react';
import axios from "axios";

const LOGIN_URL = 'http://localhost:8082/auth/authenticate';
// async function loginUser(credentials: any) {
//     return fetch('http://localhost:8082/auth/authenticate', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     })
//         .then(data => data.json())
// }
export default function Login() {
    const userRef = useRef();
    const errRef = userRef;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    const handleMailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        setErrMsg('');
    },[email, password])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({email, password}),{
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
            console.log(JSON.stringify(response))

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            // setAuth({email, password, roles, accessToken});

            console.log(email, password)

            setSuccess(true);
        // } catch (err){
        //     if (!err?.response){
        //         setErrMsg("No server response");
        //     } else if (err.response?.status === 400) {
        //         setErrMsg("Login fail");
        //     } else {
        //         setErrMsg("Missing email or password")
        //     }
        //
        // }

    }


    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            {/*<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live = "assertive">*/}
            {/*    {errMsg}*/}
            {/*</p>*/}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={email} onChange={handleMailChange}/>
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange}/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}