import React, { Component } from 'react';
import styles from './App.css';

import SetupApp from './setup-app';
import Home from './home';
import Storage from './libs/Storage';

class App extends Component {
  state = {
    settings: null,
    user: null,
    loading: true,
  }

  constructor(props) {
    super(props);

    this.onChangeBackgroundColor = this.onChangeBackgroundColor.bind(this);
    this.onChangeTextColor = this.onChangeTextColor.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
  }

  componentWillMount() {
    Storage.getItem('settings').then(settings => {
      this.setState({ settings });
    });

    Storage.getItem('user').then(user => {
      this.setState({ user, loading: false });
    });
  }

  onChangeBackgroundColor(value) {
    this.setState({ settings: { ...this.state.settings, backgroundColor: value } });
  }

  onChangeTextColor(value) {
    this.setState({ settings: { ...this.state.settings, textColor: value } });
  }

  onChangeUser(user) {
    this.setState({ user });

    Storage.setItem('settings', this.state.settings);
    Storage.setItem('user', user);
  }

  render() {
    let backgroundColor, textColor;

    if (this.state.settings && this.state.settings.backgroundColor) {
      backgroundColor = this.state.settings.backgroundColor;
    } else if (this.state.loading) {
      backgroundColor = '#fff';
    } else {
      backgroundColor = '#00CA9D';
    }

    if (this.state.settings && this.state.settings.textColor) {
      textColor = this.state.settings.textColor;
    } else if (this.state.loading) {
      textColor = '#fff';
    } else {
      textColor = '#fff';
    }

    return (
      <section className={styles.container} style={
        {
          backgroundColor,
          color: textColor,
        }
      }>
        {!this.state.user && !this.state.loading && <SetupApp
          onChangeBackgroundColor={this.onChangeBackgroundColor}
          onChangeTextColor={this.onChangeTextColor}
          onChangeUser={this.onChangeUser}
        />}

        {
          this.state.user && !this.state.loading && <Home date={new Date(this.state.user.birthday)} />
        }
      </section>
    );
  }
}

export default App;
