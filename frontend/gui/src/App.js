import React, {Component} from "react";
import { BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import * as actions from './store/actions/auth';

import 'antd/dist/antd.css';
import CustomLayout from './containers/Layout';
// import ArticleList from './containers/ArticleListView';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render () {
    return (
      
      <div>
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter/>
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: ()=> dispatch( actions.authCheckState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
