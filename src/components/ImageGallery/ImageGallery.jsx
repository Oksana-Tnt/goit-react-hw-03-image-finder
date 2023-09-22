import { getImage } from 'Services/GetImage';
import ErrorCard from 'components/ErrorCard/ErrorCard';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import { Component } from 'react';
import { ImageItem, ImageList } from './ImageGallery.styled';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

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
    largeImageURL: '',
    isShowModal: false,
    tags: '',
    totalPages: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchText !== this.props.searchText) {
      this.setState({ status: STATUS.PENDING, page: 1, images: [] });
      this.fetchFirstPageOfImages();
    }

    if (
      prevState.page !== this.state.page &&
      this.state.page < this.state.totalPages
    ) {
      this.fetchMorePagesOfImages();
    }
  }

  fetchFirstPageOfImages = async () => {
    try {
      const data = await getImage(this.props.searchText, this.state.page);
      this.setState({
        images: data.data.hits,
        status: STATUS.RESOLVED,
        totalPages: data.data.totalHits,
      });
    } catch (error) {
      this.setState({ status: STATUS.REJECTED });
    }
  };

  fetchMorePagesOfImages = async () => {
    try {
      const data = await getImage(this.props.searchText, this.state.page);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.data.hits],
        status: STATUS.RESOLVED,
      }));
    } catch (error) {
      this.setState({ status: STATUS.REJECTED });
    }
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
    }));
  };

  showImage = id => {
    this.setState(({ largeImageURL, tags }) => ({
      largeImageURL: this.state.images.find(image => image.id === id)
        .largeImageURL,
      tags: this.state.images.find(image => image.id === id).tags,
    }));
  };

  render() {
    const { images, status } = this.state;

    if (status === STATUS.PENDING) return <Loader />;
    else if (status === STATUS.RESOLVED) {
      return (
        <>
          <ImageList>
            {images.map(el => (
              <ImageItem key={el.id}>
                {this.state.isShowModal && (
                  <Modal closeModal={this.toggleModal}>
                    <img src={this.state.largeImageURL} alt={this.state.tags} />
                  </Modal>
                )}

                <ImageGalleryItem
                  webformatURL={el.webformatURL}
                  tags={el.tags}
                  showModal={this.toggleModal}
                  showImage={this.showImage}
                  id={el.id}
                />
              </ImageItem>
            ))}
          </ImageList>

          <Button loadMoreImages={this.loadMoreImages} />
        </>
      );
    } else if (status === STATUS.REJECTED) return <ErrorCard />;
  }
}

export default ImageGallery;
