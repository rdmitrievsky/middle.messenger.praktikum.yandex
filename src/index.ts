import { Block, renderDOM, registerComponent }  from './core';
import Tst from './pages/tst';

import './styles/general-style.sass'

const components = require('./components/**/index.ts') as {[key: string]: { default: typeof Block }};

Object.values(components).forEach((component) => {
  registerComponent(component.default);
});

class MyComponent extends Block {
    render() {
        return `
            <div>hello world11</div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderDOM(Tst);
});