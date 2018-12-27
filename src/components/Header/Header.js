import React from 'react';
import { connect } from 'react-redux';
import css from './Header.module.scss';

const header = (props) => (
    <header className={css.Head}>
        <h2>{ (!props.calculated) ? 'Total' : 'Each one should pay ~'}:</h2>
        <h1>$ { (!props.calculated) ? props.total : props.total / props.persons.length }</h1>
    </header>
)

const mapStateToProps = (state) => {
    return {
        total: state.total,
        calculated: state.calculated,
        persons: state.persons
    }
}

export default connect(mapStateToProps, null)(header)