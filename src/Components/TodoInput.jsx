import React from 'react'

export const TodoInput = ({addTodo}) => {

    const [inputValue, setInputValue] = React.useState("")

    return(
        <>
        <input placeholder='Add a new TODO' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={() => addTodo(inputValue)} >+</button>
        
        </>
    )
}