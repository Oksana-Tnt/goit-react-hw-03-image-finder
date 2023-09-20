import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchBar from 'components/SearchBar/SearchBar';

import { Component } from 'react';

export class App extends Component{
  state = {
    searchText:"",
  }

  handleSearch = (searchText)=>{
    this.setState({searchText})
  }

  render(){
    return (    
       
    
        <><SearchBar handleSearch={this.handleSearch}/>
        <ImageGallery searchText={this.state.searchText} />
        </>
    );
  }
  
};

