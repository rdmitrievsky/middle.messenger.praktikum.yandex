import EventBus from "../core/EventBus";

export interface Action {
    type: string;
    payload?: any;
}

type Reducer<T = any> = (state: T, action: Action) => T;

type Indexed = {[key: string]: any}

export class Store extends EventBus {
    private state: Indexed = {};
    private reducer: Reducer;

    constructor(reducers: Indexed) {
        super();
        this.reducer = this.combineReducers(reducers);
        this.dispatch({type: '@@INIT'});
    }

    dispatch(action: Action) {
        this.state = this.reducer(this.state, action);
        this.emit('changed');
    }
    getState() {
        return this.state;
    }
    combineReducers(reducers: Indexed): Reducer {
        return (_state: any, action: Action) => {
            const newState: Indexed = {};
            Object.entries(reducers).forEach(([key, reducer]) => {
                newState[key] = reducer(this.state[key], action);
            })
            return newState;
        }
    }
}