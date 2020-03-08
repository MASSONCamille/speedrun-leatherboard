const mkReducer = <State, R extends Reducables<State>>(reducables: R, initialState: State, options: OptionType = {}) => ({
    actions: Object.entries(reducables).reduce(
        (acc, [type, _]) =>
            Object.assign(acc, { [type]: (payload: any) => ({ type: options.prefix ? options.prefix + type : type, payload }) }),
        {} as { [Type in keyof R & string]: (payload?: object | State) => DuxAction<Type, object | State> }
    ),
    constants: Object.entries(reducables).reduce(
        (acc, [type, _]) =>
            Object.assign(acc, {
                [type]: options.prefix ? options.prefix + type : type
            }),
        {} as { [Type in keyof R & string]: string }
    ),
    reducer: (state = initialState, action: ReduxAction) => {
        if (!options.prefix || action.type.startsWith(options.prefix)) {
            const type = action.type.substr((options.prefix || "").length);
            const actionHandler = reducables[type];
            return actionHandler ? Object.assign({}, state, action.payload) : state;
        }
        return state;
    }
});

type Reducables<State> = { [type in string]: boolean };
type ReduxAction = { type: string; [props: string]: any };
type DuxAction<Type extends string, Payload> = { type: Type; payload: Payload };

type OptionType = {
    prefix?: string;
};

export default mkReducer;
