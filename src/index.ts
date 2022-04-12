import { Block, renderDOM, registerComponent }  from './core';
import Login from './pages/login';
import Chat from './pages/chat';
import { Account } from './pages/account/general';
import { EditProfile } from './pages/account/editinfo/editprofile';
import { EditPassword } from './pages/account/editpassword/editpassword';
import { Registration } from './pages/home/registration/registration';
import chatActive from './pages/chatActive';

import './styles/general-style.sass'

const components = require('./components/**/index.ts') as {[key: string]: { default: typeof Block }};

Object.values(components).forEach((component) => {
  registerComponent(component.default);
});

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === '/') {
        renderDOM(Login);
    } else if (window.location.pathname === '/chat') {
        renderDOM(Chat);
    } else if (window.location.pathname === '/profile') {
        renderDOM(Account);
    } else if (window.location.pathname === '/editprofile') {
        renderDOM(EditProfile);
    } else if (window.location.pathname === '/editpassword') {
        renderDOM(EditPassword);
    } else if (window.location.pathname === '/registration') {
        renderDOM(Registration);
    } else if (window.location.pathname === '/chatActive') {
        renderDOM(chatActive);
    }
});