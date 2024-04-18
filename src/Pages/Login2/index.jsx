import { useState } from "react";
import React from 'react';
import { Link, useNavigate } from "react-router-dom"; 
import styles from "./styles.module.css";

const Login2 = () => {
    const [data, setData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleChange = ({ target: { name, value } }) => {
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = data;

        try {
            const response = await fetch('http://localhost:3030/api/V3/auth/singin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_name: username,
                    password: password
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                const authToken = responseData.accessToken; 
                console.log("Token recibido:", authToken); 
                localStorage.setItem("token", authToken);
                navigate("/home");
            } else {
                throw new Error('Nombre de usuario o contraseña no válidos');
            }
        } catch (error) {
            setError("Nombre de usuario o contraseña no válidos");
            console.error(error);
        }
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Himusic</h1>
                        <input
                            type="text"
                            placeholder="Nombre de usuario"
                            name="username"
                            onChange={handleChange}
                            value={data.username}
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
