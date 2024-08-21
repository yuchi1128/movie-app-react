import React, { useState } from 'react'
import { createContext, useEffect } from 'react'
import axios from 'axios'

import { ApiContextType } from '../types/apiContextType'

import { withCookies } from 'react-cookie'
import { CookieProps } from '../types/cookieProrsType'

import { Video } from '../types/videoType'


const defaultContextValue: ApiContextType = {
    videos: [],
    title: '',
    setTitle: () => {},
    video: null,
    setVideo: () => {},
    thum: null,
    setThum: () => {},
    selectedVideo: null,
    setSelectedVideo: () => {},
    modalIsOpen: false,
    setModalIsOpen: () => {},
    newVideo: () => {},
    deleteVideo: () => {},
    incrementLike: () => {},
    incrementDislike: () => {},
}

export const ApiContext = createContext<ApiContextType>(defaultContextValue);

const ApiContextProvider: React.FC<CookieProps> = (props) => {

  const token = props.cookies.get('jwt-token');
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState<string>('');
  const [video, setVideo] = useState<File | null>(null);
  const [thum, setThum] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/videos/', {
          headers: {
            'Authorization': `JWT ${token}`,
          },
        });
        setVideos(res.data);
      } catch {
        console.log("error");
      }
    };
    getVideos();
  }, [token]);

  const newVideo = async () => {
    const uploadData = new FormData()
    uploadData.append('title', title);
    if (video) {
        uploadData.append('video', video, video.name);
    }
    if (thum) {
        uploadData.append('thum', thum, thum.name);
    }
    try {
        const res = await axios.post('http://localhost:8000/api/videos/', uploadData, {
            headers: {
                // 'Content-Type': 'application/json', 　　　 いらない　これのせいでたくさん時間かかった
                'Authorization': `JWT ${token}`,
            },
        });
        setVideos([...videos, res.data]);
        setModalIsOpen(false);
        setTitle('');
        setVideo(null);
        setThum(null);
    } catch {
        console.log('error');
    }
  };

  const deleteVideo = async () => {
    try {
        if (selectedVideo) {
            await axios.delete(`http://localhost:8000/api/videos/${selectedVideo.id}/`, {   //URLの最後のスラッシュはつけないといけない
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`,
                },
            });
            setVideos(videos.filter((item) => item.id !== selectedVideo.id));
        }
        setSelectedVideo(null);
    } catch {
        console.log('error');
    }
  };

  const incrementLike = async () => {
    try {
        if (selectedVideo) {
            const uploadData = new FormData()
            uploadData.append('like', String(selectedVideo.like + 1));
            const res = await axios.patch(`http://localhost:8000/api/videos/${selectedVideo.id}/`, uploadData, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`,
                },
            });
            setSelectedVideo({ ...selectedVideo, like: res.data.like });
            setVideos(
                videos.map((item) => (item.id === selectedVideo.id ? res.data : item))
            );
        }
    } catch {
        console.log('error');
    }
  };

  const incrementDislike = async () => {
    try {
        if (selectedVideo) {
            const uploadData = new FormData()
            uploadData.append('dislike', String(selectedVideo.dislike + 1));
            const res = await axios.patch(`http://localhost:8000/api/videos/${selectedVideo.id}/`, uploadData, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`,
                },
            });
            setSelectedVideo({ ...selectedVideo, dislike: res.data.dislike });
            setVideos(
                videos.map((item) => (item.id === selectedVideo.id ? res.data : item))
            );
        }
    } catch {
        console.log('error');
    }
  };


  return (
    <ApiContext.Provider
      value={{
        videos,
        title,
        setTitle,
        video,
        setVideo,
        thum,
        setThum,
        selectedVideo,
        setSelectedVideo,
        modalIsOpen,
        setModalIsOpen,
        newVideo,
        deleteVideo,
        incrementLike,
        incrementDislike,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  )
}

export default withCookies(ApiContextProvider)