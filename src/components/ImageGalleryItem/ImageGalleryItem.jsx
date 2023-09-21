import React from 'react';
import { Img } from './ImageGallery.styled';

const ImageGalleryItem = ({ webformatURL, tags}) => {
  return (
    <>
    
        <Img src={webformatURL} alt={tags}/>
    
    </>
  );
};

export default ImageGalleryItem;
