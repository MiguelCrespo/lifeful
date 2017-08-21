import React, { Component } from 'react';
import styles from './App.css';

import SetupApp from './setup-app';

class App extends Component {
  state = {
    config: null,
  }

  render() {
    return (
      <section className={styles.container}>
        {!this.state.config && <SetupApp />}
      </section>
    );
  }
}

export default App;
