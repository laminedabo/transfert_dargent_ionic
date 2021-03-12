import { ConnectedUser } from './user.role';
import { createAction, props } from '@ngrx/store';

export const connectedUser = createAction('[USER] Connected', props<{user: ConnectedUser}>());
