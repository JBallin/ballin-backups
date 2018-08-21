import React from 'react';
import Gist from 'react-gist';
import '../css/File.css';

const GistFile = ({gistID, title, extension}) => {
  const fileName = title + extension;
  return (
    <div>
      <h5>{title}</h5>
      <div className={'gist'}>
        <Gist id={gistID} file={fileName} />
      </div>
    </div>
  )
}

export default GistFile;
