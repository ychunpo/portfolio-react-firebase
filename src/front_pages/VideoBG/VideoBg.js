import React, { useEffect } from 'react';
import styled from "styled-components";
import videoCover from '../../images/initialism_name_square-logo.png'

const FVBGContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;  
  background-color: #1e2b37;
  z-index: -1;  

  .video-container {  
    margin: 0 auto;   
    width: 100%;
    hight:100%;    
    object-fit: fill;
    background: url('../../images/initialism_name_square-logo.png')
    position: absolute;
  }
`

const VideoBg = () => {

  useEffect(() => {
    const getVideo = document.querySelector("video");
    //let count = 0;
    getVideo.addEventListener('ended', (event) => {
      //getVideo.seekable.start(count);
    });

  }, []);

  return (
    <FVBGContainer>
      <div className="FVBG-main">
        <video
          className="video-container"
          muted
          preload="none"
          autoPlay="autoplay"
          controls
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/myportfolio-fb953.appspot.com/o/video%2FPortfolio_site_bg.mp4?alt=media&token=b2935164-30d8-4128-b315-fbcda53588b8"
            type="video/mp4"
          />
          Your browser does not support video!
        </video>
      </div>
    </FVBGContainer>
  )
}

export default VideoBg;