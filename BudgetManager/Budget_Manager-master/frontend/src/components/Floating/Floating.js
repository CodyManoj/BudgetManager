import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Responsive } from '../../util/Responsive';
function Floating() {
  console.log("called");
  const {width,height} = Responsive()
  const Move_Float = keyframes`
    0%{
        transform: translate(0,0);
    }
    50%{
        transform: translate(${width}px,${height}px);
    }
    100%{
        transform: translate(0,0);
    }
  `;

  const FloatingStyle = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    border-radius: 50%;
    margin-left: -37vh;
    margin-top: -37vh;
    background: linear-gradient(180deg, #71C9CE 0%, #A6E3E9 100%);
    filter: blur(400px);
    animation: ${Move_Float} 15s alternate linear infinite; 
  `;

  return <FloatingStyle />;
}

export default Floating;
