import * as actions from '../actions/'

const initialState = {
    total: 0,
    persons: [],
    calculated: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_PERSON:
            const persons_aux = [...state.persons];
            persons_aux.push(action.newPerson);
            const total = state.total + Number(action.newPerson.money)
            return {
                ...state,
                total: Number(total.toFixed(1)),
                persons: persons_aux
            }
        case actions.MAKE_OP:
            const persons_op = JSON.parse(JSON.stringify( state.persons ));
            const sub_total = Number((state.total / persons_op.length).toFixed(1));
            persons_op.forEach(e => {
                e.owes = sub_total - e.money;
            })
            return {
                ...state,
                persons: persons_op,
                calculated: true
            }
        default: return state
    }
}

export default reducer