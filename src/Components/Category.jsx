import React from 'react';
import '../css/Category.css';

const Category = ({ category }) => {
  const title = Object.keys(category)[0];
  const files = Object.values(category)[0];
  return (<button className={'category'} onClick={() => window.location.href=`#${title}`}>
    <h3>{title}</h3>
  </button>)
}

export default Category;
