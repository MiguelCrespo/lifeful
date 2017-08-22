import React, { Component } from 'react';

import Storage from '../libs/Storage';
import styles from './index.css';
import quotes from './quotes.json';

export default class Home extends Component {
    state = {
        years: 0,
        minor: 0,
        quote: {
            text: '',
            author: '',
        },
    }

    static defaultProps = {
        title: 'AGE',
    }

    componentWillMount() {
        this.updateDate();

        // Show just one quote per day because we don't have many...
        Storage.getItem('qod', null).then(qod => {
            const now = new Date(new Date().toDateString());
            let index;

            if (!qod || (qod && now.getTime() > new Date(qod.date).getTime())) {
                index = Math.floor(Math.random() * quotes.quotes.length)

                Storage.setItem('qod', { date: now, index });
            } else {
                index = qod.index;
            }

            this.setState({
                quote: {
                    text: quotes.quotes[index].body,
                }
            });
        });
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
                <section></section>
                <section className={styles.ageContainer}>
                    <h1 className={styles.ageTitle}>AGE</h1>

                    <section className={styles.timeContainer}>
                        <h2 className={styles.ages}>{this.state.years}</h2>
                        <span className={styles.minor}>.{this.state.minor}</span>
                    </section>
                </section>

                <section className={styles.quoteContainer}>
                    <h1 className={styles.quoteTitle} dangerouslySetInnerHTML={{ __html: this.state.quote.text }}></h1>

                    <span className={styles.quoteAuthor}>{this.state.quote.author}</span>
                </section>
            </section>
        );
    }
}