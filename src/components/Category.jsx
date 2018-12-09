import React, { Component } from 'react';
import '../css/Category.css';
import PropTypes from 'prop-types';
import GistFile from './GistFile';

class Category extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    gistId: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      extension: PropTypes.string.isRequired,
    })).isRequired,
  }

  state = {
    display: false,
  };

  toggleDisplay = () => {
    this.setState(prev => ({ display: !prev.display }));
  }

  render() {
    const {
      category, gistId, files,
    } = this.props;
    const { display } = this.state;
    const categoryButton = (
      <button
        type="button"
        className="category"
        onClick={this.toggleDisplay}
      >
        { category }
      </button>
    );
    const embeds = (
      files.map(({ title, extension }) => (
        <GistFile
          title={title}
          extension={extension}
          gistId={gistId}
          key={title + extension}
        />
      ))
    );
    return (
      <div>
        { categoryButton }
        { display && embeds }
      </div>
    );
  }
}

export default Category;
