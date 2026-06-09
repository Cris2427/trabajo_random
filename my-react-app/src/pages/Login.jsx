import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login.css";

function Login () {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState ("");
    const [cargando, setCargando] = useState (false);

    async function  handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (! correo || !password){
            setError("Por favor complete todos los campos");
            return;
        }
        //try{
            setCargando(true);

            // const {data}
        }
        
    }
    
    return (
        <div className="login-page">
            <div className="panel">
                <form className="form-box" onSubmit={handleSubmit}>
                    <div className="form-titulo">Iniciar sesion</div>
                    <div className="form-subtitulo">Ingrese sus datos para inicio sesion</div>
                </form>
            </div>
        </div>
    )
}

export default Login;