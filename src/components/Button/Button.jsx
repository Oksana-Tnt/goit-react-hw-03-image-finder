import React from 'react';

const Button = ({loadMoreImages}) => {
  return (
    <div className="d-grid gap-2">
      <button className="btn btn-outline-success" type="button" onClick={loadMoreImages}>
        Load more...
      </button>
    </div>
  );
};

export default Button;
