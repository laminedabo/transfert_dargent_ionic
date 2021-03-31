import { createReducer, on, Action } from '@ngrx/store';
import { soldeUpdate } from './solde.actions' 

export const initialState: number = null
 
const _soldeReducer = createReducer(
  initialState,
  on(soldeUpdate, (_state, { solde }) => ( solde ))
);

export function soldeReducer(state: number, action: Action) {
  return _soldeReducer(state, action);
}
