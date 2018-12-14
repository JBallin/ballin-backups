import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

class TopNav extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    username: '',
  }

  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const { isOpen } = this.state;
    const { username, title } = this.props;

    const loggedOutNavLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink to="/login" className="nav-link">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/signup" className="nav-link">Signup</NavLink>
        </NavItem>
      </Nav>
    );

    const loggedInNavLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink exact to="/profile" className="nav-link">Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/profile/edit" className="nav-link">Settings</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/logout" className="nav-link">Logout</NavLink>
        </NavItem>
      </Nav>
    );

    return (
      <Navbar color="primary" dark expand="md" className="mb-5">
        <NavbarBrand href="/">{title}</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          { username ? loggedInNavLinks : loggedOutNavLinks }
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({ username: state.auth.user.username });

export default withRouter(connect(mapStateToProps, null)(TopNav));
