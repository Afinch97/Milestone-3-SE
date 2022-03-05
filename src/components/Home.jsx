import React from "react";

function Home() {
    const [user, setUser] = useState({username:"", password:""});
        const form = useRef(null);

        const submit = e => {
            e.preventDefault();
            console.log(form.current)
            const data = new FormData(form.current);
            fetch('/api', { method: 'POST', body: data })
                .then(res => res.json())
                .then(json => setUser(json.user));
        }

        return (
            <div>
            <form ref={form} onSubmit={submit}>
                <input type="text" name="user[name]" onChange={e =>setUser({...user, username: e.target.value})} value={user.username} />
                {user.errors.name && <p>{user.errors.name}</p>}

                <input type="email" name="user[email]" onChange={e =>setUser({...user, password: e.target.value})} value={user.password} />
                {user.errors.email && <p>{user.errors.email}</p>}

                <input type="submit" name="Sign Up" />
            </form>
            </div>
        )
}