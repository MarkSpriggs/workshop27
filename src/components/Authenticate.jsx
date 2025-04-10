import { use, useState } from "react"

function Authenticate({token}){
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [usernameMessage, setUsernameMessage] = useState(null)

    async function handleClick(){
        try{
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate",
                {
                    method: "GET",
                    headers:{
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                }
            );
                const result = await response.json()
                setSuccessMessage(result.message)
                setUsernameMessage(result.data.username)

        }catch(error){
            setError("Please sign up. (HINT: press submit)")

        }

    }
    return(
        <>
        <h2>Authenticate that thang!</h2>
        {successMessage && <p>{successMessage}</p>}
        {usernameMessage && <p>Your Username: {usernameMessage}</p>}
        {error && <p>{error}</p>}
        <button onClick={handleClick}>Authenticate Token</button>
        </>
    )
}

export default Authenticate