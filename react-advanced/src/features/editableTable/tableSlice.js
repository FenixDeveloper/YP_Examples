import { createSlice } from '@reduxjs/toolkit';
import { evaluate } from "mathjs";

const NAME = 'table';

const initialState = {
    values: {},
    formulas: {},
    links: {}
};
const refresh = (id, state) => {
    for (let linkedID in state.links) {
        if (state.links[linkedID].includes(id)) {
            state.values[linkedID] = calculate(linkedID, state);
            refresh(linkedID, state);
        }
    }
};
const calculate = (id, state) => {
    const scope = state.links[id].reduce((a, c) => {
        return Object.assign(a, {
            [c]: Number(state.values[c])
        })
    }, {});
    return String(evaluate(state.formulas[id], scope));
};

export const tableSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {
        setValue: (state, action) => {
            let { id, value } = action.payload;

            if (value[0] === "=") {
                state.formulas[id] = value.slice(1);
                state.links[id] = [...state.formulas[id].matchAll(/[A-Z]+\d+/g)].map(it => it[0]);
                state.values[id] = calculate(id, state);
            } else {
                state.values[id] = value;
                refresh(id, state);
            }
        }
    }
});

export const { setValue } = tableSlice.actions;

export const selectCell = (id) => (state) => ({
    value: state[NAME].values[id] ?? "",
    formula: state[NAME].formulas[id]
});

export default tableSlice.reducer;
