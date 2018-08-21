import React, {Component} from 'react';
import '../css/Category.css';
import File from './File';

class Category extends Component {
  state = {display: false};

  toggleDisplay = () => {
    this.setState(prev => ({display: !prev.display}))
  }

  render() {
    const { category, gistID } = this.props;
    const title = Object.keys(category)[0];
    const files = Object.values(category)[0];
    return (
      <div>
        <button className={'category'} onClick={this.toggleDisplay}>
          <h3>{title}</h3>
        </button>
        {this.state.display && files.map(({title, extension}, i) => (
          <File title={title} extension={extension} gistID={gistID} key={i} />
        ))}
      </div>
    )
  };
}

export default Category;
