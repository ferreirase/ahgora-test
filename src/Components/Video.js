import React from 'react';
import YouTube from 'react-youtube';

const Video = ({id}) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  };

  return (
    <YouTube
      videoId={id}
      opts={opts}
      //onReady={this._onReady}
    />
  );
};

export default Video;

 

 /*
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  } */
