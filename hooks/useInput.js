import { useState } from "react";

export const useInput = (INITIAL_VALUE) => {
    const [inputs, setInputs] = useState(INITIAL_VALUE);

    const handleChange = (event) => {
        let newInput = inputs[event.target.name];
        newInput.value = event.target.value;
        setInputs({...inputs, [event.target.name]: newInput })
    }

    const handleNewState = (NEW_STATE_VALUE) => {
        setInputs(NEW_STATE_VALUE)
    }

    return [inputs, handleChange, handleNewState];
}