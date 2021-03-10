import { createReducer, on } from '@ngrx/store';
import { adminAgence, UserAgence } from './roles.state';
 
export const initialState = '';
 
const _roleReducer = createReducer(
  initialState,
  on(adminAgence, (state) => 'ROLE_ADMINAGENCE'),
  on(UserAgence, (state) => 'ROLE_UTILISATEUR'),
);
 
export function roleReducer(state: string, action: any) {
  return _roleReducer(state, action);
}