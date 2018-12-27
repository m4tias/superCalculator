import React from 'react';
import css from './Person.module.scss';

const person = props => (
    <li className={css.person}>
        <p className={css.who}>
            <strong>{props.person.name}</strong>
        </p>
        <p className={css.money}>
            {props.type}
            <strong> ${props.money || Number(props.person.money).toFixed(1)}</strong>
            {(props.toWho) ? ` to ` : null}
            {<strong>{props.toWho}</strong> || null}
        </p>
    </li>
)

export default person;