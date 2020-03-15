interface WithStrDates {
    createdAt: string;
    updatedAt: string;
}

export type WithDbDates<Type> = Omit<Type, "createdAt" | "updatedAt"> & {
    createdAt: Date;
    updatedAt: Date;
};

export function parseDbDates<Type extends WithStrDates>(value: Type): WithDbDates<Type> {
    return {
        ...value,
        createdAt: new Date(value.createdAt),
        updatedAt: new Date(value.updatedAt)
    };
}
