import React from 'react';
import Gist from 'react-gist';
import '../css/File.css';
import PropTypes from 'prop-types';

const GistFile = ({ gistID, title, extension }) => {
  const fileName = title + extension;
  return (
    <div>
      <h5>
        {title}
      </h5>
      <div className="gist">
        <Gist id={gistID} file={fileName} />
      </div>
    </div>
  );
};

GistFile.propTypes = {
  gistID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  extension: PropTypes.string.isRequired,
};

export default GistFile;
