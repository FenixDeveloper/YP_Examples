import React, {useReducer} from "react";
import styles from "./list.module.css";

const initialState = {
    items: [],
    selected: []
};

function reducer(state, action) {
    console.log('dispatch', action);
    const target = action.target;

    switch (action.type) {
        case 'add':
            if (state.items.filter(item => item.id !== action.id)) {
                return {...state, items: [...state.items, {
                    id: action.id,
                    value: ""
                }]};
            }
            break;
        case 'select':
            return {...state, selected: [...state.selected, target]};
            break;
        case 'unselect':
            return {...state, selected: state.selected.filter(id => id !== target)};
            break;
        case 'update':
            return {...state, items: state.items.map(item => {
                if (item.id === target) return {...item, value: action.value};
                else return item;
            })}
            break;
        case 'delete':
            if (target) {
                return {...state, items: state.items.filter(item => item.id !== target)};
            } else {
                return {
                    ...state,
                    items: state.items.filter(item => !state.selected.includes(item.id)),
                    selected: []
                };
            }
            break;
        default:
            return state;
    }
}

export function EditableList() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <div className={styles.container}>
        <ul className={styles.list}>
            {state.items.map(item => <li
                key={item.id}
                className={styles.item}
            >
                <input
                    type="checkbox"
                    className={styles.selector}
                    checked={state.selected.includes(item.id)}
                    onChange={(e) => dispatch({
                        type: e.target.checked ? 'select' : 'unselect',
                        target: item.id
                    })}
                />
                <input
                    type="text"
                    className={styles.text}
                    value={item.value}
                    onChange={(e) => dispatch({
                        type:'update',
                        target: item.id,
                        value: e.target.value
                    })}
                />
                <button
                    className={styles.button}
                    onClick={() => dispatch({
                        type: 'delete',
                        target: item.id
                    })}
                >
                    Удалить
                </button>
            </li>)}
        </ul>
        <div className={styles.buttonGroup}>
            <button
                className={styles.button}
                onClick={() => {
                    console.log('click');
                    dispatch({
                        type: 'add',
                        id: Date.now()
                    })
                }}
            >
                Добавить
            </button>
            <button
                className={styles.button}
                disabled={state.selected.length === 0}
                onClick={() => dispatch({
                    type: 'delete'
                })}
            >
                Удалить выделенные
            </button>
        </div>
    </div>
}