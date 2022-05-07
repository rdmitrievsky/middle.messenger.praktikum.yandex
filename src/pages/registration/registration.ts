import { Block } from "../../core";
import validation from "../../utils/inputsVerefications";
import AuthController from "../../core/AuthController";

import './registration.scss'

export class Registration extends Block {
    protected getStateFromProps() {
        this.state = {
            values: {
                email: '',
                login: '',
                first_name: '',
                second_name: '',
                phone: '',
                password: '',
            },
            errors: {
                email: '',
                login: '',
                first_name: '',
                second_name: '',
                phone: '',
                password: '',
            },
            onValidate: async (e: MouseEvent) => {
                e.preventDefault()

                const values = {
                    email: (this.refs.email as HTMLInputElement).value,
                    login: (this.refs.login as HTMLInputElement).value,
                    first_name: (this.refs.firstname as HTMLInputElement).value,
                    second_name: (this.refs.secondname as HTMLInputElement).value,
                    phone: (this.refs.phone as HTMLInputElement).value,
                    password: (this.refs.password as HTMLInputElement).value
                }
                const nextState = {
                    errors: {
                        email: validation('email', values.email),
                        login: validation('login', values.login),
                        first_name: validation('firstname', values.first_name),
                        second_name: validation('secondname', values.second_name),
                        phone: validation('phone', values.phone),
                        password: validation('password', values.password),
                    },
                    values: { ...values },
                };

                const hasErrorsPre: boolean = Object.values<string>(nextState.errors).some(i => {
                    return i.length > 0
                })

                if (hasErrorsPre) {
                    this.setState(nextState)
                } else {
                    await AuthController.signup(nextState.values)
                }
            },
            singleValidate: (e: { target: HTMLInputElement }) => {
                const target = e.target
                const values: Record<string, string> = {
                    email: (this.refs.email as HTMLInputElement).value,
                    login: (this.refs.login as HTMLInputElement).value,
                    first_name: (this.refs.firstname as HTMLInputElement).value,
                    second_name: (this.refs.secondname as HTMLInputElement).value,
                    phone: (this.refs.phone as HTMLInputElement).value,
                    password: (this.refs.password as HTMLInputElement).value
                }
                const errors = { ...this.state.errors }
                errors[target.name] = validation(target.name, values[target.name]);
                (target.nextElementSibling as HTMLBodyElement).innerText = errors[target.name]
            }
        }
    }
    componentDidMount() {
        console.log(this.props.user)
        // if (this.props.user.profile) {
        //     this.props.router.go('/chat')
        // }
    }
    // componentDidUpdate() {
    //     if (this.props.user.profile) {
    //         this.props.router.go('/chat')
    //     }
    //     return true
    // }
    render() {
        const { values, errors } = this.state
        return `
        <div class="container">
            <form class="login login__form">
                <h3 class="login__form__label">Регистрация</h3>
                <div class="labels">
                    <label class="login__label">
                        <span class="login__label__span">Почта</span>
                        {{{Input onChange=singleValidate classes="login__label__input" ref="email" name="email" type="text" value="${values.email}"}}}
                        <span class="login__label__span_error">${errors.email}</span>
                    </label>
                    <label class="login__label">
                        <span class="login__label__span">Логин</span>
                        {{{Input onChange=singleValidate classes="login__label__input" ref="login" name="login" type="text" value="${values.login}"}}}
                        <span class="login__label__span_error">${errors.login}</span>
                    </label>
                    <label class="login__label">
                        <span class="login__label__span">Имя</span>
                        {{{Input onChange=singleValidate classes="login__label__input" ref="firstname" name="first_name" type="text" value="${values.first_name}"}}}
                        <span class="login__label__span_error">${errors.first_name}</span>
                    </label>
                    <label class="login__label">
                        <span class="login__label__span">Фамилия</span>
                        {{{Input onChange=singleValidate classes="login__label__input" ref="secondname" name="second_name" type="text" value="${values.second_name}"}}}
                        <span class="login__label__span_error">${errors.second_name}</span>
                    </label>
                    <label class="login__label">
                        <span class="login__label__span">Телефон</span>
                        {{{Input onChange=singleValidate classes="login__label__input" ref="phone" name="phone" type="text" value="${values.phone}"}}}
                        <span class="login__label__span_error">${errors.phone}</span>
                    </label>
                    <label class="login__label">
                        <span class="login__label__span">Пароль</span>
                        {{{Input onChange=singleValidate classes="login__label__input" ref="password" name="password" type="password" value="${values.password}"}}}
                        <span class="login__label__span_error">${errors.password}</span>
                    </label>
                </div>
                {{{Button text="Зарегистрироваться" type="prime" onClick=onValidate}}}
                {{{Link href="/" type="second" classes="button button_second" childrenClass="button__text" text="Войти"}}}
            </form>
        </div>
        `
    }
}