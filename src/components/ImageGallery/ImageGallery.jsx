import { getImage } from 'Services/GetImage';
import { Component } from 'react';

class ImageGallery extends Component {
  state = {
    images: null,
    isLoading: false,
    error:""
  };
  async componentDidUpdate(prevProps, prevState) {
    
    if (prevProps.searchText !== this.props.searchText) {
      this.setState({ isLoading: true });
      try {
        const data = await getImage(this.props.searchText);       
        this.setState({ images: data.data.hits });
      } catch (error) {
        this.setState({error: error.message});
      }

      this.setState({ isLoading: false });
    }
  }
  render() {
    const { images, isLoading } = this.state;

    return (
      <>
        {isLoading && (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <ul>
          {images &&
            images.map(el => {
              return <li key={el.id}>{el.tags}</li>;
            })}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
