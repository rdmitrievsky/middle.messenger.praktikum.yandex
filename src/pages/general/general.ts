import { Block } from '../../core'
import AuthController from '../../core/AuthController';

import './general.scss'

export class AccountGen extends Block {
    protected getStateFromProps() {
        this.state = {
            onLogout: () => {
                AuthController.logout();
            },
        }
    }
    componentDidMount() {
        console.log(this.props.user)
        if (!this.props.user) {
            this.props.router.go('/');
        }
    }
    componentDidUpdate() {
        if (!this.props.user) {
            this.props.router.go('/');
        }
        return true;
    }
    render() {
        const { avatar, display_name, first_name, second_name, email, phone, login } = this.props.user || {}
        // language=hbs
        return `
        <div class="container container_flex">
            <a class="button" href="/chat">
                <div></div>
            </a>
            <div class="display">
                <section class="name-avatar">
                    <button id="changeAvatar">
                        <img src="${avatar ?? ''}">
                    </button>
                    <span>${display_name ?? first_name}</span>
                </section>
                <section class="user-info">
                    <div class="user-info__item"><span class="user-info__item_bold">Почта</span><span class="user-info__item_light">${email ?? ''}</span></div>
                    <div class="user-info__item"><span class="user-info__item_bold">Логин</span><span class="user-info__item_light">${login ?? ''}</span></div>
                    <div class="user-info__item"><span class="user-info__item_bold">Имя</span><span class="user-info__item_light">${first_name ?? ''}</span></div>
                    <div class="user-info__item"><span class="user-info__item_bold">Фамилия</span><span class="user-info__item_light">${second_name ?? ''}</span></div>
                    <div class="user-info__item"><span class="user-info__item_bold">Имя в чате</span><span class="user-info__item_light">${display_name ?? ''}</span></div>
                    <div class="user-info__item"><span class="user-info__item_bold">Телефон</span><span class="user-info__item_light">+${phone ?? ''}</span></div>
                </section>
                <section class="user-control">
                    {{{Link text="Изменить данные" classes="user-control__item" childrenClass="user-control__item_blue" href="/editprofile"}}}
                    {{{Link text="Изменить пароль" classes="user-control__item" childrenClass="user-control__item_blue" href="/editpassword"}}}
                    {{{Link text="Выйти" classes="user-control__item" childrenClass="user-control__item_red" onClick=onLogout}}}
                    {{{Button text="Выйти" childrenClass="user-control__item_red" type="second" onClick=onLogout}}}
                </section>
            </div>
        </div>
        `
    }
}