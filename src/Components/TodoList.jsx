import React from "react";

export const TodoList = ({todos}) => {
    console.log(todos)
    return(
        <>
          {todos.map((item) => {
              return(
                  <>
                  <h1>{item.title}</h1>
                  
                  </>
              )
          })}  
        </>
    )

};
