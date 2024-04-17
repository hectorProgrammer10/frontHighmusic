import { useState } from "react";
import React from "react"
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error] = useState("");
    const history = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Simulando el proceso de registro sin comunicación con la base de datos
        // Aquí podrías realizar validaciones o procesos adicionales según tus necesidades
        
        // Simulamos un retraso de 1 segundo para mostrar una acción de registro
        setTimeout(() => {
            // Redirigimos al usuario a la página de inicio de sesión después de registrarse
            history.push("/home"); // Corrección aquí
            console.log("Usuario registrado exitosamente");
        }, 1000);
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Bienvenido</h1>
                    <Link to="/login2">
                        <button type="button" className={styles.white_btn}>
                            Iniciar sesión
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Crea una cuenta nueva</h1>
                        <input
                            type="text"
                            placeholder="Nombre"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
