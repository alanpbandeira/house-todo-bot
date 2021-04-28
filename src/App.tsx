import React, { useState } from 'react';
import {Button, ButtonGroup, Text, useText} from '@urban-bot/core';

interface Todo {
    text: string;
    id: number;
    isCompleted: Boolean;
}

export function App() {
    const [todos, setTodos] = useState<Array<Todo>>([]);

    function addTodo(text: string) {
        const newTodo: Todo = {text, id: Math.random(), isCompleted: false};
        setTodos([...todos, newTodo]);
    }

    function toggleTodo(toggleId: number) {
        
        const newTodos = todos.map((todo) => {
            if (todo.id === toggleId) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                };
            }

            return todo;
        });

        setTodos(newTodos);
    }

    useText(({ text }) => {
        addTodo(text);
    });

    const title = todos.map( (todo) => (
        <>
            {todo.isCompleted? <s> {todo.text} </s>: todo.text}
            <br />
        </>
    ));


    const todosButtons = todos.map( ({ text, id }) => (
        <Button key={id} onClick={() => toggleTodo(id)}>
            { text }
        </Button>
    ));


    if (todos.length === 0) {
        return <Text> Todo list is empty </Text>;
    }

    return (
      <ButtonGroup
        title={title}
        maxColumns={3}
        isNewMessageEveryRender={false}
      >
          {todosButtons}
      </ButtonGroup>  
    );
}
