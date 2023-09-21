import { getImage } from 'Services/GetImage';
import ErrorCard from 'components/ErrorCard/ErrorCard';
import { Component } from 'react';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
class ImageGallery extends Component {
  state = {
    images: null,
    error: '',
    status: STATUS.IDLE,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchText !== this.props.searchText) {
      this.setState({ status: STATUS.PENDING });

      getImage(this.props.searchText)
        .then(data => {
          console.log(data);
          if (data.status === 200)
            this.setState({ images: data.data.hits, status: STATUS.RESOLVED });
          else return data.statusText;
        })
        .catch(error => {
          this.setState({ error: error.message, status: STATUS.REJECTED });
        });

      // try {
      //   const data = await getImage(this.props.searchText);
      //   this.setState({ images: data.data.hits });
      // } catch (error) {
      //   this.setState({ error: error.message });
      // }
    }
  }

  render() {
    const { images, error, status } = this.state;

    if (status === STATUS.PENDING)
      return (
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    else if (status === STATUS.RESOLVED) {
      return (
        <>
          <ul>
            {images.map(el => {
              return <li key={el.id}>{el.tags}</li>;
            })}
            <button>Load</button>
          </ul>
        </>
      );
    } else if (status === STATUS.REJECTED)
      return <ErrorCard>{error}</ErrorCard>;
  }
}

export default ImageGallery;
