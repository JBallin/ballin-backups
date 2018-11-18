import React from 'react';
import { Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';

const SignupHelp = () => {
  document.title = 'Signup Help | My Sweet Config';

  const ballinScriptsLink = (
    <a href="https://github.com/JBallin/ballin-scripts" rel="noreferrer noopener" target="_blank">
      Ballin Scripts
    </a>
  );
  /* eslint-disable react/jsx-one-expression-per-line */
  const howGenGist = (
    <div className="lead">
      <ol>
        <li>
          Install { ballinScriptsLink }:
          <br />
          <code>{'$ bash <(curl -s https://raw.githubusercontent.com/JBallin/ballin-scripts/master/install.sh)'}</code>
        </li>
        <br />
        <li>
          Generate a backup of your dev environment into a gist:
          <br />
          <code>$ gu</code>
        </li>
        <br />
        <li>
          Output your new Gist ID:
          <br />
          <code>$ ballin_config get gu.id</code>
        </li>
        <br />
      </ol>
    </div>
  );
  /* eslint-enable react/jsx-one-expression-per-line */

  return (
    <div className="main-wrapper">
      <Jumbotron>
        <h1 className="display-3">Signup Help</h1>
        <hr className="my-2" />
        <h3 className="mt-5 mb-3">How do I get a Gist ID?</h3>
        { howGenGist }
      </Jumbotron>
      <Link to="/signup">Back to Signup</Link>
    </div>
  );
};

export default SignupHelp;
