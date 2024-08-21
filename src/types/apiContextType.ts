import { Video } from "./videoType";

export interface ApiContextType {
    videos: Video[];
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    video: File | null;
    setVideo: React.Dispatch<React.SetStateAction<File | null>>;
    thum: File | null;
    setThum: React.Dispatch<React.SetStateAction<File | null>>;
    selectedVideo: Video | null;
    setSelectedVideo: React.Dispatch<React.SetStateAction<Video | null>>;
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    newVideo: () => void;
    deleteVideo: () => void;
    incrementLike: () => void;
    incrementDislike: () => void;
  }