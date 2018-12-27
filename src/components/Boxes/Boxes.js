import React from 'react';
import css from './Boxes.module.scss';
import { connect } from 'react-redux';
import Person from './Person/Person';
import Distrib from './Distrib/Distrib';
import * as actions from '../../actions/'

const boxes = props => {
    let persons = null;
    if (props.persons && !props.calculated)
        persons = props.persons.map((e, i) => (
            <Person
                person={e}
                key={i}
                type="paid" />
        ));

    let distrib = null;
    if (props.calculated) {
        persons = props.persons.map((e, i) => (
            <Person
                person={e}
                key={i}
                money={Math.abs(e.owes).toFixed(1)}
                type={(e.owes < 0) ? 'is owed' : 'debits'} />
        ));

        const ow = JSON.parse(JSON.stringify(props.persons));

        const debtors = ow
            .filter(e => e.owes > 0)
            .sort((a, b) => (a.owes < b.owes ? 1 : -1));
        const owed = ow
            .filter(e => e.owes < 0)
            .sort((a, b) => (a.owes > b.owes ? 1 : -1));

        distrib = <Distrib debtors={debtors} owed={owed} />
    }

    let button = null;
    if (props.persons.length > 1 && !props.calculated)
        button = (
            <button className={css.button} onClick={props.handleCalculo}>
                Calculate
                </button>
        )

    return (
        <div className={css.boxes}>
            <ul>
                {persons}
            </ul>
            <p>
                {(distrib) ? 'They can do this:' : null}
            </p>
            <ul>
                {distrib}
            </ul>
            {button}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        persons: state.persons,
        calculated: state.calculated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleCalculo: () => dispatch({ type: actions.MAKE_OP })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(boxes);