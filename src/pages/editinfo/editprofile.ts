import { Block } from "../../core";
import AuthController from "../../core/AuthController";
import validation from "../../utils/inputsVerefications";

import './editinfo.scss'

export class EditProfile extends Block {
    protected getStateFromProps() {
        this.state = {
            isChangeComplete: false,
            isDataChanged: true,
            values: {
                email: '',
                login: '',
                first_name: '',
                second_name: '',
                phone: '',
                display_name: '',
                password: '',
            },
            errors: {
                email: '',
                login: '',
                first_name: '',
                second_name: '',
                phone: '',
                display_name: '',
                password: '',
            },
            onValidate: (e: MouseEvent) => {
                const values = {
                    email: (this.refs.email as HTMLInputElement).value,
                    login: (this.refs.login as HTMLInputElement).value,
                    first_name: (this.refs.firstname as HTMLInputElement).value,
                    second_name: (this.refs.secondname as HTMLInputElement).value,
                    display_name: (this.refs.displayname as HTMLInputElement).value,
                    phone: (this.refs.phone as HTMLInputElement).value,
                }
                const nextState = {
                    isChangeComplete: false,
                    isDataChanged: true,
                    errors: {
                        email: validation('email', values.email),
                        login: validation('login', values.login),
                        first_name: validation('firstname', values.first_name),
                        second_name: validation('secondname', values.second_name),
                        display_name: validation('displayname', values.display_name),
                        phone: validation('phone', values.phone),
                    },
                    values: { ...values },
                };

                function compareData(obj1: object, obj2: object): boolean {
                    const keys2: string[] = Object.keys(obj2)
                    
                    return keys2.every(i => {
                        return obj1[i] === obj2[i]
                    })
                }

                if (compareData(this.props.user, values)) {
                    return
                } else {
                    nextState.isDataChanged = false
                    const asd = AuthController.editUserInfo(values)
                    
                    asd.then(q => {
                        nextState.isChangeComplete = q
                        this.setState(nextState)
                    })
                }

                // console.log(this.props.user)

                

                e.preventDefault()
            },
            singleValidate: (e: { target: HTMLInputElement }) => {
                const target = e.target
                const values: Record<string, string> = {
                    email: (this.refs.email as HTMLInputElement).value,
                    login: (this.refs.login as HTMLInputElement).value,
                    first_name: (this.refs.firstname as HTMLInputElement).value,
                    second_name: (this.refs.secondname as HTMLInputElement).value,
                    display_name: (this.refs.displayname as HTMLInputElement).value,
                    phone: (this.refs.phone as HTMLInputElement).value
                }
                const errors = { ...this.state.errors }
                errors[target.name] = validation(target.name, values[target.name]);
                (target.nextElementSibling as HTMLBodyElement).innerText = errors[target.name]
            }
        }
    }
    componentDidMount() {
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
        const { isChangeComplete, isDataChanged, values, errors } = this.state
        const { avatar, display_name, first_name, second_name, email, phone, login } = this.props.user || {}
        return `
            <div class="container container_flex">
                <a class="button_back" href="/profile">
                    <div></div>
                </a>
                <div class="display">
                    <section class="name-avatar">
                        <div><img src="${avatar}"></div>
                    </section>
                    <section class="user-info">
                        <label>
                            <span>Почта</span>
                            {{{Input onChange=singleValidate value="${email}" ref="email" type="text" placeholder="pochta@yandex.ru" name="email"}}}
                            <span class="login__label__span_error">${errors.email}</span>
                        </label>
                        <label>
                            <span>Логин</span>
                            {{{Input onChange=singleValidate value="${login}" ref="login" type="text" placeholder="ivanivanov" name="login"}}}
                            <span class="login__label__span_error">${errors.login}</span>
                        </label>
                        <label>
                            <span>Имя</span>
                            {{{Input onChange=singleValidate value="${first_name}" ref="firstname" type="text" placeholder="Иван" name="first_name"}}}
                            <span class="login__label__span_error">${errors.first_name}</span>
                        </label>
                        <label>
                            <span>Фамилия</span>
                            {{{Input onChange=singleValidate value="${second_name}" ref="secondname" type="text" placeholder="Иванов" name="second_name"}}}
                            <span class="login__label__span_error">${errors.second_name}</span>
                        </label>
                        <label>
                            <span>Имя в чате</span>
                            {{{Input value="${display_name}" ref="displayname" type="text" placeholder="Иван" name="display_name"}}}
                        </label>
                        <label>
                            <span>Телефон</span>
                            {{{Input onChange=singleValidate value="${phone}" ref="phone" type="text" placeholder="+7 (909) 967 30 30" name="phone"}}}
                            <span class="login__label__span_error">${errors.phone}</span>
                        </label>
                        <div>${isChangeComplete ? 'Данные успешно изменены' : ''}</div>
                    </section>
                    {{{Button text="Сохранить" type="prime" onClick=onValidate}}}
                </div>
            </div>
        `
    }
}