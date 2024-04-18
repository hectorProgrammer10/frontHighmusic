import React, { useEffect, useState } from 'react';
import './Search.scss';
import Container from "../../components/fragment/Container/Container";
import { useSelector } from "react-redux";
import MusicCard from "../../components/fragment/MusicCard/MusicCard";
import SearchMusic from "../../assets/img/searchMusic.svg";
import SearchMusicMp3 from "../../assets/img/searchMusicMp3.svg";
import SearchMusicDisc from "../../assets/img/searchMusicDisc.svg";
import ArrowUp from '../../assets/img/left.svg';

const Search = () => {
    const { search } = useSelector(state => state.musicReducer);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3030/api/V3/song/find/${encodeURIComponent(search)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem("token")
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setSearchResult(data ? [data] : []);
                } else {
                    setSearchResult([]);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResult([]);
            }
        };

        if (search && search.trim() !== "") {
            fetchData();
        } else {
            setSearchResult([]);
        }
    }, [search]);

    return (
        <Container>
            {search === "" || search === null ? (
                <div className={"Search"}>
                    <div className="Search-img">
                        <img className={"Rotate-img"} src={SearchMusicDisc} alt="search-music-icon"/>
                        <img src={SearchMusicMp3} alt="search-music-icon"/>
                        <img src={SearchMusic} alt="search-music-icon"/>
                        <img className={"Arrow"} src={ArrowUp} alt=""/>
                    </div>
                </div>
            ) : (
                <div className={"Search-result"}>
                    {searchResult.length === 0 ? (
                        <div className={"Search-fallback"}>No se encontraron resultados.</div>
                    ) : (
                        searchResult.map((item) => <MusicCard key={item._id} music={item}/>)
                    )}
                </div>
            )}
        </Container>
    );
}

export default Search;
