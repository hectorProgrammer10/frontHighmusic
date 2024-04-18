import React, { useEffect, useState } from 'react';
import '../MusicCard/MusicCard.scss';
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { useDispatch } from "react-redux";
import { increaseTimesPlayed, setCurrentPlaying } from "../../../actions/actions";
import Name from "../Name/Name";
import { Skeleton } from "@material-ui/lab";
import Box from "@material-ui/core/Box";

function MusicCard(props) {
    const { name, img, author_name } = props.music;

    const [isHovered, setHovered] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    function handleResponse() {
        setHovered(!isHovered);
    }

    const dispatch = useDispatch();

    function handlePlay() {
        dispatch(setCurrentPlaying(props.music));
        dispatch(increaseTimesPlayed(props.music.id));
    }

    let imageSrc = '';
    try {
        imageSrc = require("../../../assets/img/" + img);
    } catch (error) {
        console.error("Error loading image:", error);
    }

    return (
        <div className={"music-card"}>
            {!loaded ? (
                <div className={"Skeleton-top"}>
                    <Skeleton variant="rect" width={210} height={210} />
                    <Box pt={0.5}>
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Box>
                </div>
            ) : (
                <>
                    <div onClick={handlePlay} className={"music-card-cover"} onMouseOver={handleResponse}>
                        <img src={imageSrc} alt={name} />
                        <div className="play-circle">
                            <PlayCircleFilledWhiteIcon />
                        </div>
                    </div>
                    <React.Fragment>
                        <Name name={name} className={"song-name"} length={name?.length || 0} />
                        <Name name={author_name} className={"author-name"} length={author_name?.length || 0} />
                    </React.Fragment>

                </>
            )}
        </div>
    );
}

export default MusicCard;
