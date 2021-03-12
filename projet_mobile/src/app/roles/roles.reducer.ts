import { ConnectedUser } from './user.role';
import { createReducer, on, Action } from '@ngrx/store';
import { connectedUser } from './roles.action';
 
export const initialState: ConnectedUser = {
  userId: null,
  accountId: null,
  role: '',
  telephone: ''
};
 
const _roleReducer = createReducer(
  initialState,
  on(connectedUser, (_state, { user }) => ( user )),
);

export function roleReducer(state: ConnectedUser, action: Action) {
  return _roleReducer(state, action);
}
