export enum DataStateEnum{
    LOADED, LOADING, ERROR
}

export enum URI{
    "USER" = "[/admin/users]",
}

export interface AppDataState<T> {
    dataState: DataStateEnum,
    data?: T,
    errorMessage?: string
}