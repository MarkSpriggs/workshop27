import { useState } from "react"

function SignUpForm({setToken}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault();
        if (username.length < 8){
            setError("Username must be longer than 8 characters.")

        }else{
            try{
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup",
                {
                    method: "POST",
                    headers:{
                        "Content-type": "application/json",
                        // Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })

                const result = await response.json()
                console.log(result)
                setToken(result.token);


            }catch(error){
                setError(error.message)
            }
        }
    }

    return(
        <>
        <h1>Sign Up!</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
            Username:
                <input name="username"
                onChange={(event)=> setUsername(event.target.value)}
                value={username}/>
            </label>
            <label>
            Password:
                <input name="password"
                onChange={(event)=> setPassword(event.target.value)}
                value={password}/>
            </label>
            <button>Submit</button>
        </form>
        </>
    )
}

export default SignUpForm