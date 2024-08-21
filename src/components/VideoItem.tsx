import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { ApiContextType } from '../types/apiContextType';
import { VideoItemProps } from '../types/videoItemProps';

const CardStyled = styled(Card)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  marginBottom: 15,
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(1),
}));


const VideoItem: React.FC<VideoItemProps> = ({ video }) => {
  const { setSelectedVideo } = useContext<ApiContextType>(ApiContext);

  return (
    <CardStyled onClick={() => setSelectedVideo(video)}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="thumbnail"
          height="200"
          image={video.thum}
        />
        <CardContentStyled>
          <Typography variant="h6">{video.title}</Typography>
        </CardContentStyled>
      </CardActionArea>
    </CardStyled>
  );
};

export default VideoItem;
