import React, {useState} from "react";
import {Navigate} from "react-router-dom";

const Register = ()=>{
    const [user, setUser] = useState({username:"",email:"" ,password:""});
    const [error, setError] = useState("");
        const submit = e => {
            e.preventDefault();
            console.log(JSON.stringify(user))
            fetch('/login', { method: 'POST', headers:{'Content-Type':'application/json'} ,body: JSON.stringify(user) })
                .then(res => res.json())
                .then(json => {
                    console.log(json)
                    var key = Object.keys(json)
                    console.log(key[0])
                    if(key[0]==="success"){
                        return <Navigate to='/login'  />;
                    }
                    else if(key[0]==="error"){
                        setError(Object.values(json))
                    }
                });
        }

        return (
            <>
            <div className="error"><p>{error}</p></div>
            <form  onSubmit={submit}>
                <label htmlFor="user">Username: </label>
                <input type="text" name="user" id="user" onChange={e =>setUser({...user, username: e.target.value})} value={user.username}/>

                <label htmlFor="user">Email: </label>
                <input type="text" name="email" id="email" onChange={e =>setUser({...user, email: e.target.value})} value={user.email}/>

                <label htmlFor="user">Password: </label>
                <input type="password" name="password" id="password" onChange={e =>setUser({...user, password: e.target.value})} value={user.password} />

                <input type="submit" name="Sign Up" />
            </form>
            </>
        )

}
export default Register