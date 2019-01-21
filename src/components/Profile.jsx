import Bowser from 'bowser';
import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PageSpinner from './PageSpinner';
import Category from './Category';

const API = process.env.REACT_APP_API;
const browser = Bowser.getParser(window.navigator.userAgent).getBrowserName();
const safariError = 'Safari doesn\'t support 3rd-party cookies, which is an issue because this app uses a separate domain for the API. You can either disable "Prevent cross-site tracking" in Settings/Privacy or use Chrome.';

class Profile extends Component {
  static propTypes = {
    gistId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }

  state = {
    files: [],
    isLoading: true,
    error: false,
  };

  componentDidMount = async () => {
    const { userId } = this.props;
    try {
      const delay = 700;
      const delayedPromise = new Promise(resolve => setTimeout(resolve, delay));
      const getFiles = () => fetch(`${API}/users/${userId}/files`, { credentials: 'include' }).then(r => r.json());
      const [files] = await Promise.all([getFiles(), delayedPromise]);
      if (files.error) {
        this.setState({ error: files.error, isLoading: false });
      } else {
        this.setState({ files, isLoading: false });
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
    const errorMessage = (
      <div>
        <h3>{ `Error: ${error}` }</h3>
        <p>{ error.includes('token') && browser === 'Safari' ? safariError : '' }</p>
      </div>
    );
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
  userId: state.auth.user.id,
});

export default connect(mapStateToProps, null)(Profile);
