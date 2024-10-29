async function login() {
    const response= await fetch("http://localhost:5001/crearCliente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: "betoben222", 
            mail: "email@locuras.co",
            password: "password"})
        });
    return (
        response.json()
    )
}
export function Probando() {
    
    return (
        <div>
            <h1>Probando</h1>
            <button onClick={login}>Login</button>
        </div>
    )
}
