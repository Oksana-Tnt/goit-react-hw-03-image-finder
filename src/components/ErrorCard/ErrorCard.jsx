import React from 'react';
import img from '../saddest-cat-luhu-maggie-liu-lanlan731-38-59c0bfed09657__700.jpg';

const ErrorCard = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">OOOps, there is no image</h5>
        <img src={img} width="300px" />
      </div>
    </div>
  );
};

export default ErrorCard;
