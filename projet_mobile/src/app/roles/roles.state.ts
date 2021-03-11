import { createAction } from '@ngrx/store';

export const adminAgence = createAction('ROLEADMINAGENCE');
export const UserAgence = createAction('ROLEUTILISATEUR');
export const UserId = createAction('USER_ID', (amount: any) => amount);
export const UserAccount = createAction('USER_ACCOUNT', (amount: any) => amount);
