import React from 'react';
import { Img } from './ImageGallery.styled';

const ImageGalleryItem = ({ webformatURL, tags, id, showModal, showImage }) => {
  return (
    <>
      <a onClick={showModal}>
        <div onClick={() => showImage(id)}>
          <Img src={webformatURL} alt={tags} />
        </div>
      </a>
    </>
  );
};

export default ImageGalleryItem;
