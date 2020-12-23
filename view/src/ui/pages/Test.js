import React from 'react'
import { useDispatch } from 'react-redux'
import {addDart, addTodo} from "../../store/actions/X01Actions";

export const Test = ({ value }) => {
    const dispatch = useDispatch()

    return (
        <div>
            <span>{value}</span>
            <button onClick={() => addTodo('test')}>
                Increment counter
            </button>
        </div>
    )
}

export default Test;