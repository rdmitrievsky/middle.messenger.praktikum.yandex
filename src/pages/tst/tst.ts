import { Block } from "../../core";
import validation from "../../utils/inputsVerefications";
import { renderDOM } from "../../core";
import Chat from "../chat";

class MyComponent extends Block {
    render() {
        return `
            <div>hello world11</div>
        `;
    }
}
export class Tst extends Block {
    protected getStateFromProps() {
        this.state = {
            values: {
                login: '',
                password: '',
            },
            errors: {
                login: '',
                password: '',
            },
            onValidate: (e: MouseEvent) => {
                const values = {
                    login: (this.refs.login as HTMLInputElement).value,
                    password: (this.refs.password as HTMLInputElement).value
                }
                const nextState = {
                    errors: {
                        login: validation('login', values.login),
                        password: validation('password', values.password),
                    },
                    values: { ...values },
                };

                this.setState(nextState)
                
                let qwew: boolean = Object.values<string>(this.state.errors).some(i => {
                    console.log(i.length)
                    return i.length > 0
                })

                if (!qwew) {
                    renderDOM(Chat)
                }

                e.preventDefault()
            }
        }
    }
    render() {
        let { values, errors } = this.state
        // language=hbs
        return `
            <main>
                <div class="container">
                    <form id="qweq" class="login login__form">
                        <h3 class="login__form__label">Вход<h3>
                        <div class="labels">
                            <label class="login__label">
                                <span class="login__label__span">Логин</span>
                                {{{Input ref="login" name="login" type="text" value="${values.login}"}}}
                                {{#if errors.login}}
                                    <span class="login__label__span_error">${errors.login}</span>
                                {{/if}}
                            </label>
                            <label class="login__label">
                                <span class="login__label__span">Пароль</span>
                                {{{Input ref="password" name="password" type="password" value="${values.password}"}}}
                                {{#if errors.password}}
                                    <span class="login__label__span_error">${errors.password}</span>
                                {{/if}}
                            </label>
                        </div>
                        {{{Button text="Авторизоваться" type="prime" onClick=onValidate}}}
                        {{{Link href="#" type="second" text="Нет аккаунта?"}}}
                    </form>
                </div>
            </main>
        `
    }
}