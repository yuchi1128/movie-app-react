import React, { useContext, useRef } from "react";
import { ApiContext } from "../context/ApiContext";

import { ApiContextType } from "../types/apiContextType";

import ReactPlayer from "react-player";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";

import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { IoLogoYoutube } from "react-icons/io";



const Title = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

const DeleteButton = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const LikeButton = styled("button")(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));

const VideoDetail: React.FC = () => {
  const player = useRef(null);
  const {
    selectedVideo,
    deleteVideo,
    incrementLike,
    incrementDislike,
  } = useContext<ApiContextType>(ApiContext);

  if (!selectedVideo) {
    return (
        <div className="container">
          <button className="wait">
            <IoLogoYoutube />
          </button>
        </div>
    );
  }
  return (
    <>
      <div className="wrapper">
        <ReactPlayer
          className="player"
          url={selectedVideo.video}
          ref={player}
          width="90%"
          height="100%"
          playing
          controls
          disablePictureInPicture
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
                disablePictureInPicture: true,
              },
            },
          }}
        />
      </div>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <Title variant="h6">
            {selectedVideo.title}
          </Title>
        </Grid>

        <Grid item xs={1}>
          <LikeButton onClick={() => incrementLike()}>
            <AiFillLike />
            <Typography>{selectedVideo.like}</Typography>
          </LikeButton>
        </Grid>
        <Grid item xs={1}>
          <LikeButton onClick={() => incrementDislike()}>
            <AiFillDislike />
            <Typography>{selectedVideo.dislike}</Typography>
          </LikeButton>
        </Grid>
      </Grid>
      <DeleteButton
        color="primary"
        aria-label="delete"
        onClick={() => deleteVideo()}
      >
        <DeleteIcon />
      </DeleteButton>
    </>
  );
};

export default VideoDetail;
