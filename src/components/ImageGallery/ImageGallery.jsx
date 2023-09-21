import { getImage } from 'Services/GetImage';
import ErrorCard from 'components/ErrorCard/ErrorCard';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import { Component } from 'react';
import { ImageItem, ImageList } from './ImageGallery.styled';
import Button from 'components/Button/Button';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
class ImageGallery extends Component {
  state = {
    images: [],  
    status: STATUS.IDLE,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
  
    if (prevProps.searchText !== this.props.searchText || prevState.page!==this.state.page) {
      this.setState({ status: STATUS.PENDING });    
      
      if(prevProps.searchText!==this.props.searchText){
        this.setState({page:1, images:[]});
      }

      try {
        const data = await getImage(this.props.searchText, this.state.page);
        console.log(data);

        // this.setState ({ images: data.data.hits, status: STATUS.RESOLVED });
        
          this.setState(prevState=>({images:[...data.data.hits, ...prevState.images], status:STATUS.RESOLVED}));
   

      } catch (error) {
        this.setState({status: STATUS.REJECTED });
      }
    }
  }  
   
  
  loadMoreImages = ()=>{   
    this.setState(prevState=>({page: prevState.page +1}));    
  }

  render() {
    const { images, status } = this.state;

    if (status === STATUS.PENDING)
      return <Loader/>
    else if (status === STATUS.RESOLVED) {
      return (
        <>
        
        <ImageList>
        {images.map(el =>
         <ImageItem key={el.id}>        
            <ImageGalleryItem webformatURL={el.webformatURL} tags={el.tags} />
          </ImageItem>  
          )}       
         </ImageList>
        <Button loadMoreImages={this.loadMoreImages}/>
        </>
      );
    } else if (status === STATUS.REJECTED)
      return <ErrorCard></ErrorCard>;
  }
}

export default ImageGallery;
