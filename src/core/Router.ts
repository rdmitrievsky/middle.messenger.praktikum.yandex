import Block from './Block'

class Route {
    private _pathname: string;
    private _blockClass: typeof Block;
    private _block: Block | null;
    private _props: any;
    
    constructor(pathname: string, view: typeof Block, props: any) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }
    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }
    leave() {
        if (this._block) {
            this._block.getContent().remove();
        }
    }
    match(pathname: string) {
        return pathname === this._pathname;
    }
    render() {
        console.log(new this._blockClass().getContent())
        // if (!this._block) {
        //     this._block = new this._blockClass();
        //     const root = document.querySelector(this._props.rootQuery);
        //     if (!root) {
        //         throw new Error('No root')
        //     }
        //     root.innerHTML = ''
        //     root.appendChild(this._block.getContent())
        // }
        const block = new this._blockClass();
        const root = document.querySelector('#app');
        
        root!.innerHTML = '';
        root!.appendChild(block.getContent());
        block.dispatchComponentDidMount();
        return root;
    }
}

class Router {
    static __instance: Router;
    routes: Route[] = [];
    history = window.history;
    private _currentRoute: Route | null = null;

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }
        Router.__instance = this;
    }
    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, {rootQuery: '#app'}); 
        this.routes.push(route);
        return this;
    }
    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }
    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route
        route.render();
    }
    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }
    forward() {
        this.history.forward()
    }
    back() {
        this.history.back()
    }
    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default Router

export function withRouter(Component: typeof Block) {
    return class WithRouter extends Component {
        constructor(props: any) {
            console.log('props123')
            const router = new Router()
            super({...props, router: router})
        }
    }
}