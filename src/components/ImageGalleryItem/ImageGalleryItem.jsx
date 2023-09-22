import React from 'react';
import { Img } from './ImageGallery.styled';

const ImageGalleryItem = ({ webformatURL, tags, id, showModal, showImage }) => {
  return (
    <>
      <div onClick={showModal}>
        <Img src={webformatURL} alt={tags} onClick={() => showImage(id)} />
      </div>
    </>
  );
};

export default ImageGalleryItem;
