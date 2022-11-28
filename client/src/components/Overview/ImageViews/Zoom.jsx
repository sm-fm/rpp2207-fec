import React, { useState, useEffect, createRef } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const Zoom = (props) => {

  const handleMouseMove = (e) => {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    var node = document.getElementById('zoom');
    var zoomedImg = ReactDOM.findDOMNode(node);
    zoomedImg.style.transformOrigin = `${x}px ${y}px`;
    zoomedImg.style.transform = 'scale(2.5)';
    zoomedImg.style.cursor = 'zoom-out'
  }

  return (
    <div id="zoom-container"
      onMouseMove={handleMouseMove}
      onClick={() => props.setZoomView(false)}>
      <img
        src={props.img}
        id="zoom" />
    </div>
  )
}

export default Zoom;