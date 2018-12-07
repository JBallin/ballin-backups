import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PageSpinner from './PageSpinner';
import Category from './Category';

const API = process.env.REACT_APP_API;

class Profile extends Component {
  static propTypes = {
    gistId: PropTypes.string.isRequired,
  }

  state = {
    files: [],
    isLoading: true,
    error: false,
  };

  componentDidMount = async () => {
    try {
      const delay = 700;
      const delayedPromise = new Promise(resolve => setTimeout(resolve, delay));
      const getFiles = fetch(`${API}/files`).then(r => r.json());
      const files = (await Promise.all([getFiles, delayedPromise]))[0];
      const users = await fetch(`${API}/users`).then(r => r.json());
      const gistID = users[0].gist_id;
      if (files.error) {
        this.setState({ error: files.error, isLoading: false });
      } else {
        this.setState({ files, gistID, isLoading: false });
      }
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  render() {
    document.title = 'Profile | My Sweet Config';
    const { files, isLoading, error } = this.state;
    const { gistId } = this.props;
    const fileCategories = files.map(({
      category, id, files: filesArr,
    }) => (
      <Category
        category={category}
        files={filesArr}
        key={id}
        gistId={gistId}
      />
    ));
    const errorMessage = <h3>{ `Error: ${error}` }</h3>;
    const displayCategories = () => {
      if (error) return errorMessage;
      if (isLoading) return <PageSpinner />;
      return fileCategories;
    };

    return displayCategories();
  }
}

const mapStateToProps = state => ({
  gistId: state.auth.user.gist_id,
});

export default connect(mapStateToProps, null)(Profile);
