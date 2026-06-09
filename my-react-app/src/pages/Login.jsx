import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js"; 
import "../login.css";

function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!correo || !password) {
      setError("Por favor complete todos los campos");
      return;
    }

    try {
      setCargando(true);

      const { data } = await api.post("/user/login", {
        correo,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("tipoToken", data.tipo || "Bearer");
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          id: data.id,
          nombre: data.nombre,
          email: data.email,
          rol: data.rol,
        })
      );

      navigate("/");
    } catch (error) {
      const mensaje =
        error.response?.data?.mensaje ||
        error.response?.data?.message ||
        "Correo o contraseña incorrectos.";

      setError(mensaje);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-page">
      <div className="panel">
        <form className="form-box" onSubmit={handleSubmit}>
          <div className="form-titulo">Iniciar sesión</div>

          <div className="form-subtitulo">
            Ingrese sus datos para iniciar sesión
          </div>

          <div className={`error ${error ? "visible" : ""}`}>
            {error}
          </div>

          <input
            type="email"
            placeholder="Correo@gmail.com"
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
          />

          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />


          <button className="btn-login" type="submit" disabled={cargando}>
            <span className="btn-texto">
              {cargando ? "Ingresando..." : "Ingresar"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;