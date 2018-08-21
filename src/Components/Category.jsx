import React from 'react';
import '../css/Category.css';
import File from './File';

const Category = ({ category, gistID }) => {
  const title = Object.keys(category)[0];
  const files = Object.values(category)[0];
  return (
    <div>
      <button className={'category'} onClick={() => window.location.href=`#${title}`}>
        <h3>{title}</h3>
      </button>
      {files.map(({title, extension}, i) => (
        <File title={title} extension={extension} gistID={gistID} key={i} />
      ))}
    </div>
  )
}

export default Category;
