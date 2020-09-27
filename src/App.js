import React from 'react';
import "normalize.css";
import "./index.css";
import FullpageLoader from './components/FullpageLoader';
import Main from './components/Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaderVisible: true
    }
  }

  toggleLoader = check => {
    this.setState({
      isLoaderVisible: check
    })
  }

  render() {
    return (
      <div className="app">
        <FullpageLoader
          toggleLoader={check => this.toggleLoader(check)}
        />
        <Main
          isLoaderVisible={this.state.isLoaderVisible}
        />
      </div>
    )
  }

}

export default App;
