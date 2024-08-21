import React, { useContext } from "react";

import { ApiContext } from "../context/ApiContext";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { ApiContextType } from "../types/apiContextType";

import VideoItem from "./VideoItem";


const VideoListContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
});

const VideoList: React.FC = () => {
  const { videos } = useContext<ApiContextType>(ApiContext);
  const listOfVideos = videos.map((video) => (
    <VideoItem key={video.id} video={video} />
  ));

  return (
    <Grid container spacing={5}>
      <VideoListContainer className="video-list">
        {listOfVideos}
      </VideoListContainer>
    </Grid>
  );
};

export default VideoList;