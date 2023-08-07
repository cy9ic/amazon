// React context api 

import React, {createContext,useContext, useReducer} from "react";

export const StateContext = createContext(); //Preparing the data layer. 

// This provides the value of the StateContext / Data layer
export const StateProvider = ({reducer, initialState, children})=>(
    <StateContext.Provider value = {useReducer(reducer, initialState)}> 
    {children}
    </StateContext.Provider>
);



// This pulls out the info from the contextState
export const useStateValue = () => useContext(StateContext);



// This code is an implementation of the React Context API, which allows you to manage global state in a React application and pass data down the component tree without having to pass props manually through each level. It sets up a data layer for the application using Context and provides a custom hook to access the state and dispatch function from that data layer.

// Let's go through the code step by step:

// 1. `createContext`: This function from React creates a new Context object. The `StateContext` constant holds this Context object, which will be used to create the data layer.

// 2. `StateProvider`: This is a custom component that acts as the provider of the data layer. It takes three props:
//    - `reducer`: The reducer function that specifies how the state should be updated based on dispatched actions.
//    - `initialState`: The initial state of the data layer.
//    - `children`: The child components that will be wrapped by this provider.

//    Inside this `StateProvider`, it uses `useReducer` to initialize the state and the dispatch function. `useReducer` is a built-in React hook that works similar to Redux's reducer. It takes the `reducer` and `initialState` as arguments and returns the current state and the dispatch function. The current state and dispatch function are provided as the value to the `StateContext.Provider`, making them accessible to child components.

// 3. `useStateValue`: This is a custom hook that allows components to consume the state and dispatch function from the data layer. It uses the `useContext` hook to access the current context value, which is the state and dispatch provided by the `StateContext.Provider`.

// In summary, this code sets up a data layer using the React Context API. The `StateProvider` component wraps the root of your component tree, providing a state management mechanism for all the child components. The `useStateValue` hook enables any child component to access the state and dispatch function to read or update the global state. This setup helps manage the state of the application in a more organized and centralized manner, making it easier to share state across components without prop drilling.