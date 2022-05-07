import { Block } from "../../../core";
import validation from "../../../utils/inputsVerefications";

import './editpassword.scss'

export class EditPassword extends Block {
    protected getStateFromProps() {
        this.state = {
            values: {
                oldPassword: '',
                newPassword: '',
                newPassword2: ''
            },
            errors: {
                oldPassword: '',
                newPassword: '',
                newPassword2: ''
            },
            onValidate: (e: MouseEvent) => {
                const values = {
                    oldPassword: (this.refs.oldPassword as HTMLInputElement).value,
                    newPassword: (this.refs.newPassword as HTMLInputElement).value,
                    newPassword2: (this.refs.newPassword2 as HTMLInputElement).value
                }
                const nextState = {
                    errors: {
                        oldPassword: validation('password', values.oldPassword),
                        newPassword: validation('password', values.newPassword),
                        newPassword2: validation('password', values.newPassword2)
                    },
                    values: { ...values },
                };

                this.setState(nextState)

                e.preventDefault()
            },
            singleValidate: (e: { target: HTMLInputElement }) => {
                const target = e.target
                const values: Record<string, string> = {
                    oldPassword: (this.refs.oldPassword as HTMLInputElement).value,
                    newPassword: (this.refs.newPassword as HTMLInputElement).value,
                    newPassword2: (this.refs.newPassword2 as HTMLInputElement).value
                }
                const errors = { ...this.state.errors }
                errors[target.name] = validation('password', values[target.name]);
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
                        <span>Старый пароль</span>
                        {{{Input value="${values.oldPassword}" onChange=singleValidate ref="oldPassword" type="password" name="oldPassword"}}}
                        <span class="login__label__span_error">${errors.oldPassword}</span>
                    </label>
                    <label>
                        <span>Новый пароль</span>
                        {{{Input value="${values.newPassword}" onChange=singleValidate ref="newPassword" type="password" name="newPassword"}}}
                        <span class="login__label__span_error">${errors.newPassword}</span>
                    </label>
                    <label>
                        <span>Повторите новый пароль</span>
                        {{{Input value="${values.newPassword2}" onChange=singleValidate ref="newPassword2" type="password" name="newPassword2"}}}
                        <span class="login__label__span_error">${errors.newPassword2}</span>
                    </label>
                </section>
                {{{Button onClick=onValidate text="Сохранить" type="prime" onClick=getData}}}
                </div>
            </div>
        `
    }
}