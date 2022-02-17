import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Video from '../Video';
import Playlist from './Playlist';
import StyledVideoPlayer from '../styles/StyledVideoPlayer';
import { useParams, useNavigate } from 'react-router-dom';

const theme = {
  bgcolor: "#353535",
  bgcolorItem: "#414141",
  bgcolorItemActive: "#405c63",
  bgcolorPlayed: "#526d4e",
  border: "none",
  borderPlayed: "none",
  color: "#fff",
};

const themeLight = {
  bgcolor: "#fff",
  bgcolorItem: "#fff",
  bgcolorItemActive: "#80a7b1",
  bgcolorPlayed: "#7d9979",
  border: "1px solid #353535",
  borderPlayed: "none",
  color: "#353535",
};

const VideoPlayer = ({ match, history, location }) => {

  const { activeVideo } = useParams();
  const navigate = useNavigate()
  // const { pathname, search } = useLocation();
  // const query = new URLSearchParams()

  const videos = JSON.parse(document.querySelector('[name="videos"]').value);
  // fetching persisted videos state from local storage
  const savedState = JSON.parse(localStorage.getItem(`${videos.playlistId}`));

  // populate fresh state values if no data persisted in local storage
  const [state, setState] = useState({
    videos: savedState ? savedState.videos : videos.playlist,
    activeVideo: savedState ? savedState.activeVideo :videos.playlist[0],
    nightMode: savedState ? savedState.nightMode : true,
    playlistId: savedState ? savedState.playlistId :videos.playlistId,
    autoplay: false,
  });

  // to persist played video details to local storage
  useEffect(() => {
    localStorage.setItem(`${state.playlistId}`, JSON.stringify({ ...state }))
  }, [state]);


  // find the id of current playing video from URL
  //  if yes the pass that value to player
  // otherwise (if undefined) set the initial video id and navigate to that 
  useEffect(() => {
    if (activeVideo !== undefined) {
      const newActiveVideo = state.videos.findIndex(
        video => video.id === activeVideo,
      )
      setState(prevState => ({
        ...prevState,
        activeVideo: prevState.videos[newActiveVideo]
        // grab from useLocation hook
        // autoplay: location.autoplay, 
      }));
    } else {
      // need to push URL in pathname and autoplay bool as object
      navigate(`/${state.activeVideo.id}`)

      console.log('in useEffect else part', activeVideo);
    }
  }, [activeVideo, navigate, state.activeVideo.id, state.videos]);

  const nightModeCallback = () => {

    setState(prevState => ({
      ...prevState,
      nightMode: !state.nightMode
    }))

  }

  const endCallback = () => {

    // find the index of current video
    const currentVideoIndex = state.videos.findIndex(
      video => video.id === activeVideo,
    );
    // if curren video is equal to state video id then reset the video to first video otherwise 
    // increment to next video
    const nextVideo = currentVideoIndex === state.videos.length - 1 ? 0 : currentVideoIndex + 1;
    navigate(`/${state.videos[nextVideo].id}`)
  }

  const progressCallback = e => {
    // find the seconds played in a video by getting it from react-player then mark them as played
    if (e.playedSeconds > 10 && e.playedSeconds < 11) {
      // setState(prevState => ({
      //   ...prevState,
      //   videos: state.videos.map(element => {
      //     return element.id === state.activeVideo.id ? {
      //       ...element,
      //       played: true
      //     } : element;
      //   })
      // }))

      const videos = [...state.videos];
      const playedVideo = videos.find(
        video => video.id === state.activeVideo.id
      )

      playedVideo.played = true;

      setState(prevState => ({ ...prevState, videos }))
    }
  }


  return (
    <ThemeProvider theme={state.nightMode ? theme : themeLight}>
      {state.videos !== null ? (
        <StyledVideoPlayer>
          <Video
            active={state.activeVideo}
            autoplay={state.autoplay}
            endCallback={endCallback}
            progressCallback={progressCallback}
          />
          <Playlist
            videos={state.videos}
            active={state.activeVideo}
            nightModeCallback={nightModeCallback}
            nightMode={state.nightMode}
          />
        </StyledVideoPlayer>
      ) : null}
    </ThemeProvider>
  )
}

export default VideoPlayer;