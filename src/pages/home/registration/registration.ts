import { Block } from "../../../core";
import validation from "../../../utils/inputsVerefications";

import './registration.sass'

export class Registration extends Block {
    protected getStateFromProps() {
        this.state = {
            values: {
                email: '',
                login: '',
                firstname: '',
                secondname: '',
                phone: '',
                password: '',
            },
            errors: {
                email: '',
                login: '',
                firstname: '',
                secondname: '',
                phone: '',
                password: '',
            },
            onValidate: (e: MouseEvent) => {
                const values = {
                    email: (this.refs.email as HTMLInputElement).value,
                    login: (this.refs.login as HTMLInputElement).value,
                    firstname: (this.refs.firstname as HTMLInputElement).value,
                    secondname: (this.refs.secondname as HTMLInputElement).value,
                    phone: (this.refs.phone as HTMLInputElement).value,
                    password: (this.refs.password as HTMLInputElement).value
                }
                const nextState = {
                    errors: {
                        email: validation('email', values.email),
                        login: validation('login', values.login),
                        firstname: validation('firstname', values.firstname),
                        secondname: validation('secondname', values.secondname),
                        phone: validation('phone', values.phone),
                        password: validation('password', values.password),
                    },
                    values: { ...values },
                };
                this.setState(nextState)

                e.preventDefault()
            },
            singleValidate: (e: { target: HTMLInputElement }) => {
                const target = e.target
                const values: Record<string, string> = {
                    email: (this.refs.email as HTMLInputElement).value,
                    login: (this.refs.login as HTMLInputElement).value,
                    firstname: (this.refs.firstname as HTMLInputElement).value,
                    secondname: (this.refs.secondname as HTMLInputElement).value,
                    phone: (this.refs.phone as HTMLInputElement).value,
                    password: (this.refs.password as HTMLInputElement).value
                }
                const errors = { ...this.state.errors }
                errors[target.name] = validation(target.name, values[target.name])
                const nextState = {
                    errors: { ...errors },
                    values: { ...values },
                };
                this.setState(nextState)
            }
        }
    }
    render() {
        const { values, errors } = this.state
        return `
        <div class="container">
            <form class="login login__form" id="qweq">
                <h3 class="login__form__label">Регистрация</h3>
                <div class="labels">
                    <label class="login__label">
                        <span class="login__label__span">Почта</span>
                        {{{Input onChange=singleValidate classes="login__label__input" ref="email" name="email" type="text" value="${values.email}"}}}
                        {{#if errors.email}}
                            <span class="login__label__span_error">${errors.email}</span>
                        {{/if}}
                    </label>
                    <label class="login__label">
                        <span class="login__label__span">Логин</span>
                        {{{Input onChange=singleValidate classes="login__label__input" ref="login" name="login" type="text" value="${values.login}"}}}
                        {{#if errors.login}}
                            <span class="login__label__span_error">${errors.login}</span>
                        {{/if}}
                    </label>
                    <label class="login__label">
                        <span class="login__label__span">Имя</span>
                        {{{Input onChange=singleValidate classes="login__label__input" ref="firstname" name="firstname" type="text" value="${values.firstname}"}}}
                        {{#if errors.firstname}}
                            <span class="login__label__span_error">${errors.firstname}</span>
                        {{/if}}
                    </label>
                    <label class="login__label">
                        <span class="login__label__span">Фамилия</span>
                        {{{Input onChange=singleValidate classes="login__label__input" ref="secondname" name="secondname" type="text" value="${values.secondname}"}}}
                        {{#if errors.secondname}}
                            <span class="login__label__span_error">${errors.secondname}</span>
                        {{/if}}
                    </label>
                    <label class="login__label">
                        <span class="login__label__span">Телефон</span>
                        {{{Input onChange=singleValidate classes="login__label__input" ref="phone" name="phone" type="text" value="${values.phone}"}}}
                        {{#if errors.phone}}
                            <span class="login__label__span_error">${errors.phone}</span>
                        {{/if}}
                    </label>
                    <label class="login__label">
                        <span class="login__label__span">Пароль</span>
                        {{{Input onChange=singleValidate classes="login__label__input" ref="password" name="password" type="text" value="${values.password}"}}}
                        {{#if errors.password}}
                            <span class="login__label__span_error">${errors.password}</span>
                        {{/if}}
                    </label>
                </div>
                {{{Button text="Зарегистрироваться" type="prime" onClick=onValidate}}}
                {{{Link href="/" type="second" classes="button button_second" childrenClass="button__text" text="Войти"}}}
            </form>
        </div>
        `
    }
}