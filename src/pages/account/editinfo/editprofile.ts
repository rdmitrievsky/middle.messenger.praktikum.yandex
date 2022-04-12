import { Block } from "../../../core";
import validation from "../../../utils/inputsVerefications";

import './editinfo.sass'

export class EditProfile extends Block {
    protected getStateFromProps() {
        this.state = {
            values: {
                email: '',
                login: '',
                firstname: '',
                secondname: '',
                phone: '',
                displayname: '',
                password: '',
            },
            errors: {
                email: '',
                login: '',
                firstname: '',
                secondname: '',
                phone: '',
                displayname: '',
                password: '',
            },
            onValidate: (e: MouseEvent) => {
                const values = {
                    email: (this.refs.email as HTMLInputElement).value,
                    login: (this.refs.login as HTMLInputElement).value,
                    firstname: (this.refs.firstname as HTMLInputElement).value,
                    secondname: (this.refs.secondname as HTMLInputElement).value,
                    displayname: (this.refs.displayname as HTMLInputElement).value,
                    phone: (this.refs.phone as HTMLInputElement).value,
                }
                const nextState = {
                    errors: {
                        email: validation('email', values.email),
                        login: validation('login', values.login),
                        firstname: validation('firstname', values.firstname),
                        secondname: validation('secondname', values.secondname),
                        displayname: validation('displayname', values.displayname),
                        phone: validation('phone', values.phone),
                    },
                    values: { ...values },
                };
                console.log(values)

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
                    displayname: (this.refs.displayname as HTMLInputElement).value,
                    phone: (this.refs.phone as HTMLInputElement).value
                }
                const errors = { ...this.state.errors }
                errors[target.name] = validation(target.name, values[target.name]);
                (target.nextElementSibling as HTMLBodyElement).innerText = errors[target.name]
            }
        }
    }
    render() {
        const { values, errors } = this.state
        return `
            <div class="container container_flex">
                <a class="button" href="/profile">
                    <div></div>
                </a>
                <div class="display">
                    <section class="name-avatar">
                        <div></div>
                    </section>
                    <section class="user-info">
                        <label>
                            <span>Почта</span>
                            {{{Input onChange=singleValidate value="${values.email}" ref="email" type="text" placeholder="pochta@yandex.ru" name="email"}}}
                            <span class="login__label__span_error">${errors.email}</span>
                        </label>
                        <label>
                            <span>Логин</span>
                            {{{Input onChange=singleValidate value="${values.login}" ref="login" type="text" placeholder="ivanivanov" name="login"}}}
                            <span class="login__label__span_error">${errors.login}</span>
                        </label>
                        <label>
                            <span>Имя</span>
                            {{{Input onChange=singleValidate value="${values.firstname}" ref="firstname" type="text" placeholder="Иван" name="firstname"}}}
                            <span class="login__label__span_error">${errors.firstname}</span>
                        </label>
                        <label>
                            <span>Фамилия</span>
                            {{{Input onChange=singleValidate value="${values.secondname}" ref="secondname" type="text" placeholder="Иванов" name="secondname"}}}
                            <span class="login__label__span_error">${errors.secondname}</span>
                        </label>
                        <label>
                            <span>Имя в чате</span>
                            {{{Input value="${values.displayname}" ref="displayname" type="text" placeholder="Иван" name="displayname"}}}
                        </label>
                        <label>
                            <span>Телефон</span>
                            {{{Input onChange=singleValidate value="${values.phone}" ref="phone" type="text" placeholder="+7 (909) 967 30 30" name="phone"}}}
                            <span class="login__label__span_error">${errors.phone}</span>
                        </label>
                    </section>
                    {{{Button text="Сохранить" type="prime" onClick=onValidate}}}
                </div>
            </div>
        `
    }
}