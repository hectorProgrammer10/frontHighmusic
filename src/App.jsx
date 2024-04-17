import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContext, themes } from "./api/Theme";
import musicDB from "./db/music";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "./actions/actions";
import Login2 from "./Pages/Login2";
import Signup from "./Pages/Singup";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";

const App = () => {
    

    const language = useSelector(state => state.musicReducer.language);
    const dispatch = useDispatch();

    useEffect(() => {
        const defaultLanguage = "Español";
        switch (language) {
            case null:
            case defaultLanguage.toLowerCase():
                dispatch(setPlaylist(musicDB));
                break;
            case 'ingles':
                alert("No hay pistas en inglés disponibles");
                break;
            default:
                const filteredPlaylist = musicDB.filter(item => item.lang?.toLowerCase() === language);
                dispatch(setPlaylist(filteredPlaylist));
        }
    }, [language, dispatch]);

    return (
        <ThemeContext.Provider value={themes.light}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} exact />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<Signup />} exact />
                    <Route path="/login2" element={<Login2 />} exact />
                </Routes>
            </Router>
        </ThemeContext.Provider>
    );
}

export default App;
