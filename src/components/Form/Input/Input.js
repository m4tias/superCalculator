import React from 'react';
import css from './Input.module.scss';

const input = props => (
    <label className={css.label}>
        <input className={css.input} {...props} required />
        <span>{props.label}</span>
    </label>
)

export default input;