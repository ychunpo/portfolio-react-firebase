import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const EBContainer = styled(motion.div)`

  .EB-main {    
    width: 280px;
    height: 280px;
  }

  .EB-main span {
    position: absolute;
    width: calc(260px + var(--i));
    height: calc(260px + var(--i));
    background: var(--color);
    border-radius: 50%;       
    animation: animate 5s linear infinite;
    animation-duration: calc(var(--d));
    mix-blend-mode: lighten;
    filter: blur(30px);
    transform-origin: calc(100px + var(--i)); 
  }

  .EB-main span:nth-child(even) {
    animation-direction: reverse;
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }

    @media (max-width: 1948px) {}

    @media (max-width: 620px) {
      width: 90%;
    }
}
`

const EnergyBall = () => {
  const [ref, inView] = useInView();
  const control = useAnimation();

  const ballList = [
    { '--color': '#fbad04', '--i': '18px', '--d': '2.5s' },
    { '--color': '#03a1d9', '--i': '13px', '--d': '5s' },
    { '--color': '#f7036d', '--i': '15px', '--d': '7.5s' },
    { '--color': '#93ff16', '--i': '20px', '--d': '10s' },
  ]

  const containerVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 3 } },
    hidden: { opacity: 0, scale: 0 },
  }

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <EBContainer
      ref={ref}
      variants={containerVariant}
      initial="hidden"
      animate={control}
    >
      <div className="EB-main">
        {ballList.map((item, i) => {
          return <span key={i} style={item}></span>
        })}
      </div>
    </EBContainer>
  )
}

export default EnergyBall;
