import { createReducer, on } from '@ngrx/store';
import { adminAgence, UserAccount, UserAgence, UserId } from './roles.state';
 
export const initialState = '';
 
const _roleReducer = createReducer(
  initialState,
  on(adminAgence, (state) => 'ROLE_ADMINAGENCE'),
  on(UserAgence, (state) => 'ROLE_UTILISATEUR'),
);

const _IdUserReducer = createReducer(
  initialState,
  on(UserId, (state) => state),
);

const _IdCompteReducer = createReducer(
  initialState,
  on(UserAccount, (state) => state),
);
 
export function roleReducer(state: string, action: any) {
  return _roleReducer(state, action);
}

export function idUserReducer(state: string, action: any) {
  return _IdUserReducer(state, action);
}

export function idCompteReducer(state: string, action: any) {
  return _IdCompteReducer(state, action);
}