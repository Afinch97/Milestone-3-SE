import React, {useState, useRef} from "react";

const About = ()=>{
    const [user, setUser] = useState({username:"", password:"", remember:false});
        const form = useRef(null);

        const submit = e => {
            e.preventDefault();
            const data = new FormData(form.current);
            console.log(JSON.stringify(user))
            fetch('/login', { method: 'POST', headers:{'Content-Type':'application/json'} ,body: JSON.stringify(user) })
                .then(res => res.json())
                .then(json => console.log(json));
        }

        return (
            <form ref={form} onSubmit={submit}>
                <label htmlFor="user">Name: </label>
                <input type="text" name="user" id="user" onChange={e =>setUser({...user, username: e.target.value})} value={user.username}/>

                <label htmlFor="user">Name: </label>
                <input type="password" name="password" id="password" onChange={e =>setUser({...user, password: e.target.value})} value={user.password} />

                <label className="checkbox">
                    <input type="checkbox" name="remember" value={user.remember} onChange={e =>setUser({...user, remember: !user.remember})} />
                    Remember me
                </label>
                <input type="submit" name="Sign Up" />
            </form>
        )

}
export default About