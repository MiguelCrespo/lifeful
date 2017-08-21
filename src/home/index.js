import React, { Component } from 'react';

import styles from './index.css';

export default class Home extends Component {
    state = {
        years: 0,
        minor: 0,
    }

    static defaultProps = {
        title: 'AGE',
    }

    componentWillMount() {
        this.updateDate();
    }

    updateDate() {
        let now = new Date();

        let duration = now - this.props.date;
        let years = duration / 31556900000;

        let majorMinor = years.toFixed(9).split('.');

        this.setState({
            years: majorMinor[0],
            minor: majorMinor[1],
        });

        requestAnimationFrame(this.updateDate.bind(this));
    }

    render() {
        return (
            <section className={styles.container}>
                <h1 className={styles.ageTitle}>AGE</h1>

                <section className={styles.timeContainer}>
                    <h2 className={styles.ages}>{this.state.years}</h2>
                    <span className={styles.minor}>.{this.state.minor}</span>
                </section>
            </section>
        );
    }
}