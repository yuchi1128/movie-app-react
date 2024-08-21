import React from 'react'

import { useContext } from 'react'
import { ApiContext } from '../context/ApiContext'

import { withCookies, } from 'react-cookie'
import { CookieProps } from '../types/cookieProrsType';

import Modal from 'react-modal';

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import { IoMdClose } from "react-icons/io";
import { RiUploadCloud2Line } from "react-icons/ri";
import { FaVideo } from "react-icons/fa";
import { BsImages } from "react-icons/bs";

import { ApiContextType } from '../types/apiContextType';

import VideoDetail from './VideoDetail'
import VideoList from './VideoList'


const StyledContainer = styled(Container)({
  textAlign: "center",
});

const StyledGrid = styled(Grid)({
  justifyContent: "center",
});

const Main: React.FC<CookieProps> = (props) => {

  Modal.setAppElement('#root');

  const {
    title,
    setTitle,
    video,
    setVideo,
    thum,
    setThum,
    modalIsOpen,
    setModalIsOpen,
    newVideo,
    deleteVideo,
    incrementLike,
    incrementDislike,
    selectedVideo,
    setSelectedVideo,
  } = useContext<ApiContextType>(ApiContext);

  const customStyles = {
    content: {
      top: "30%",
      left: "43%",
      right: "auto",
      bottom: "auto",
    },
  };

  const handleEditMovie = () => {
    const fileInput = document.getElementById("mp4Input");
    if (fileInput) {
        fileInput.click();
    }
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    if (fileInput) {
        fileInput.click();
    }
  };

  return (
    <>
      <StyledGrid container>
        <Grid item xs={11}>
          <Grid container spacing={5}>
            <Grid item xs={12}></Grid>

            <Grid item xs={1}>
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => setModalIsOpen(true)}
              >
                <AddIcon />
              </Fab>
            </Grid>

            <Grid item xs={8}>
              <VideoDetail />
            </Grid>

            <Grid item xs={3}>
              <VideoList />
            </Grid>
          </Grid>
        </Grid>
      </StyledGrid>


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <Typography>Movie Title</Typography>
        <br />
        <TextField
          type='text'
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <br />
        <StyledContainer>
            <input
              type='file'
              id='mp4Input'
              hidden={true}
              onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                  setVideo(event.target.files[0]);
                }
              }}
            ></input>
            <IconButton onClick={handleEditMovie}>
                <FaVideo className='photo'/>
            </IconButton>

            <input
              type='file'
              id='imageInput'
              hidden={true}
              onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                  setThum(event.target.files[0]);
                }
              }}
            ></input>
            <IconButton onClick={handleEditPicture}>
                <BsImages className='photo'/>
            </IconButton>
            <br />

            {title && video && thum && (
                <button className="btn-modal" onClick={() => newVideo()}>
                    <RiUploadCloud2Line />
                </button>
            )}
            <button className="btn-modal" onClick={() => setModalIsOpen(false)}>
                <IoMdClose />
            </button>
        </StyledContainer>

      </Modal>
    </>
  )
}

export default withCookies(Main)