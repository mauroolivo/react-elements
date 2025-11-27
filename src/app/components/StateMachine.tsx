'use client';
import { useEffect, useReducer } from 'react';

type State = {
  count: number;
  name?: string;
  error: string | null;
};
type Action =
  | { type: 'initialize' }
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' };
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'initialize':
      return { count: 0, name: 'initialize', error: null };
    case 'increment':
      return {
        ...state,
        name: 'increment',
        count: state.count + 1,
        error: null,
      };
    case 'decrement':
      if (state.count === 0) {
        return { ...state, error: 'Count cannot be negative' };
      } else {
        return {
          ...state,
          name: 'decrement',
          count: state.count - 1,
          error: null,
        };
      }
    case 'reset':
      return { count: 0, name: 'reset', error: null };
    default:
      return state;
  }
}
export default function StateMachine() {
  const [state, dispatch] = useReducer(reducer, { count: 0, error: null });
  useEffect(() => {
    dispatch({ type: 'initialize' });
  }, []);
  return (
    <>
      <div>
        Count: {state.count}, state: {state.name}
      </div>
      {state.error && <div style={{ color: 'red' }}>Error: {state.error}</div>}
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => dispatch({ type: 'increment' })}
      >
        Increment
      </button>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => dispatch({ type: 'decrement' })}
      >
        Decrement
      </button>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => dispatch({ type: 'reset' })}
      >
        Reset
      </button>
    </>
  );
}
