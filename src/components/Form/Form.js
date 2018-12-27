import React from 'react';
import css from './Form.module.scss';
import { connect } from 'react-redux';
import Input from './Input/Input';
import * as actions from '../../actions/';

class Form extends React.Component {

    state = {
        newPerson: {
            name: '',
            money: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addNewPerson(this.state.newPerson);
        this.setState({
            newPerson: {
                name: '',
                money: ''
            }
        })
    }

    handleNewPersonName = (e) => {
        this.setState({
            newPerson: {
                ...this.state.newPerson,
                name: e.target.value
            }
        })
    }

    handleNewPersonMoney = (e) => {
        this.setState({
            newPerson: {
                ...this.state.newPerson,
                money: e.target.value
            }
        })
    }

    render() {
        return (!this.props.calculated)
        ? (
            <div className={css.form}>
                <form onSubmit={this.handleSubmit}>
                    <Input label="Name" type="text" onChange={this.handleNewPersonName} value={this.state.newPerson.name} />
                    <Input label="$$$$$" type="number" onChange={this.handleNewPersonMoney} value={this.state.newPerson.money} />
                    <button type="submit" className={css.button}>Add</button>
                </form>
            </div>
        )
        : null
    }
}

const mapStateToProps = state => {
    return {
        calculated: state.calculated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewPerson: (newPerson) => dispatch({ type: actions.ADD_PERSON, newPerson })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);