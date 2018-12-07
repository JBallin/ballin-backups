import React from 'react';
import Gist from 'react-gist';
import '../css/File.css';
import PropTypes from 'prop-types';

const GistFile = ({ gistId, title, extension }) => {
  const fileName = title + extension;
  return (
    <div>
      <h5>
        {title}
      </h5>
      <div className="gist">
        <Gist id={gistId} file={fileName} />
      </div>
    </div>
  );
};

GistFile.propTypes = {
  gistId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  extension: PropTypes.string.isRequired,
};

export default GistFile;
