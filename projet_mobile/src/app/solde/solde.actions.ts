import { createAction, props } from '@ngrx/store';

export const soldeUpdate = createAction('[TRANSACTION] SoldeChange', props<{solde: number}>());
