import { useState } from "react";
import React from 'react';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import styles from "./styles.module.css";

const Login2 = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = ({ target: { name, value } }) => {
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data;

        const mockUser = { email: "ejemplo@ejemplo.com", password: "contraseña" };
    
        if (email === mockUser.email && password === mockUser.password) {
            const mockToken = "mockAuthToken";
            localStorage.setItem("token", mockToken);
            navigate("/home"); // Use navigate instead of window.location
        } else {
            setError("Correo electrónico o contraseña no válidos");
        }
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Himusic</h1>
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
                            Iniciar sesión
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>Nuevo aquí ?</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Registrarse
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login2;
