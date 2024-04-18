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
    const [error, setError] = useState("");
    const history = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3030/api/V3/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_name: `${data.firstName}_${data.lastName}`,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    password: data.password,
                    roles: ["user"]
                })
            });

            if (response.ok) {
                console.log("Usuario registrado exitosamente");
                // Redirigir al usuario a la página de inicio de sesión o mostrar un mensaje de éxito
                history.push("/home");
            } else {
                throw new Error('Error al registrar usuario');
            }
        } catch (error) {
            setError("Error al registrar usuario. Por favor, inténtelo de nuevo.");
            console.error(error);
        }
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
