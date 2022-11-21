import React, { useState, useEffect } from 'react';

const Related = (props  ) => {
  return (
    <div>
      <h1>Related.jsx</h1>
      <p>{props.generateStars(0.25, 'related')}</p>
    </div>
  )
}

export default Related;