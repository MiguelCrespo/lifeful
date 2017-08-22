import React, { Component } from 'react';

import styles from './index.css';

export default class SetupApp extends Component {
    state = {
        userInfo: {
            name: '',
            birthday: new Date(),
        },
        settings: {
            backgroundColor: '#00CA9D',
            textColor: '#35343D',
        },
        showCustomOptions: false
    }

    constructor(props) {
        super(props);

        this.onChangeBackgroundColor = this.onChangeBackgroundColor.bind(this);
        this.onChangeTextColor = this.onChangeTextColor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeBackgroundColor(e) {
        this.setState({ settings: { ...this.state.settings, backgroundColor: e.target.value } });

        this.props.onChangeBackgroundColor(e.target.value);
    }

    onChangeTextColor(e) {
        this.setState({ settings: { ...this.state.settings, textColor: e.target.value } });

        this.props.onChangeTextColor(e.target.value);
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onChangeUser(this.state.userInfo);
    }

    render() {
        return (
            <section className={styles.container}>
                <form onSubmit={this.onSubmit}>
                    <label className={styles.label}>
                        <span>Your name</span>
                        <input className="input" value={this.state.userInfo.name} onChange={(e) => { this.setState({ userInfo: { ...this.state.userInfo, name: e.target.value } }) }} />
                    </label>

                    <label className={styles.label}>
                        <span>When were you born?</span>
                        <input type="date" className="input" value={this.state.userInfo.birthday} onChange={(e) => { this.setState({ userInfo: { ...this.state.userInfo, birthday: e.target.value } }) }} />
                    </label>

                    <label className={styles.labelCheckbox}>
                        <span>Customize colors</span>
                        <input className="input" type="checkbox" value={this.state.showCustomOptions} onChange={(e) => { this.setState({ showCustomOptions: !this.state.showCustomOptions }) }} />
                    </label>

                    <div className={this.state.showCustomOptions ? styles.colorsContainerActive : styles.colorsContainer}>
                        <label className={this.state.showCustomOptions ? styles.labelColor1 : ''}>
                            <span>Background Color</span>
                            <input className="input" type="color" value={this.state.settings.backgroundColor} onChange={this.onChangeBackgroundColor} />
                        </label>

                        <label className={this.state.showCustomOptions ? styles.labelColor2 : ''}>
                            <span>Text Color</span>
                            <input className="input" type="color" value={this.state.settings.textColor} onChange={this.onChangeTextColor} />
                        </label>
                    </div>

                    <button className={styles.button + ' button'}>Motivate</button>
                </form>
            </section>
        );
    }
}