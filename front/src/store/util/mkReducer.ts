export enum ReduceAction {
    Merge,
    Replace
}

type ReduceFunction<State> = (state: State, payload: Partial<State> & { [Type in string]: any }) => State | null;

type Reducables<State> = {
    [type in string]: ReduceAction | ReduceFunction<State> | null;
};
type ReduxAction<State> = { type: string; payload: object | State };

type OptionType = {
    prefix?: string;
};

const mkReducer = <State, R extends Reducables<State>>(reducables: R, initialState: State, options: OptionType = {}) => ({
    actions: Object.entries(reducables).reduce(
        (acc, [type, _]) => ({
            ...acc,
            [type]: (payload: any) => ({ type: options.prefix ? options.prefix + type : type, payload })
        }),
        {} as { [Type in keyof R & string]: (payload?: object | State) => { type: Type; payload: object | State } }
    ),
    constants: Object.entries(reducables).reduce(
        (acc, [type, _]) => ({
            ...acc,
            [type]: options.prefix ? options.prefix + type : type
        }),
        {} as { [Type in keyof R & string]: string }
    ),
    reducer: (state = initialState, action: ReduxAction<State>) => {
        if (!options.prefix || action.type.startsWith(options.prefix)) {
            const type = action.type.substr((options.prefix || "").length);
            const actionHandler = reducables[type];
            if (actionHandler === ReduceAction.Merge) {
                return {
                    ...state,
                    ...action.payload
                };
            }
            if (actionHandler === ReduceAction.Replace) {
                return {
                    ...initialState,
                    ...action.payload
                };
            }
            if (actionHandler) {
                return {
                    ...initialState,
                    ...actionHandler(state, action.payload)
                };
            }
        }
        return state;
    }
});

export default mkReducer;
