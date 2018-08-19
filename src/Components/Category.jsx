import React from 'react';
import '../css/Category.css'

const Category = ({ title }) => (
  <button className={'category'} onClick={() => window.location.href=`#${title}`}>
    <h3>{title}</h3>
  </button>
)

export default Category;
