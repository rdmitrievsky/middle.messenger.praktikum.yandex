import { Block } from "../../../core";

import './editpassword.sass'

export class EditPassword extends Block {
    protected getStateFromProps() {
        this.state = {
            getData: () => {
                const val = {
                    'oldPassword': (this.refs.oldPassword as HTMLInputElement).value,
                    'newPassword': (this.refs.newPassword as HTMLInputElement).value,
                    'newPassword2': (this.refs.newPassword2 as HTMLInputElement).value
                }
                console.log(val)
            }
        }
    }
    render() {
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
                        {{{Input ref="oldPassword" type="password" name="oldPassword"}}}
                    </label>
                    <label>
                        <span>Новый пароль</span>
                        {{{Input ref="newPassword" type="password" name="newPassword"}}}
                    </label>
                    <label>
                        <span>Повторите новый пароль</span>
                        {{{Input ref="newPassword2" type="password" name="newPassword"}}}
                    </label>
                </section>
                {{{Button text="Сохранить" type="prime" onClick=getData}}}
                </div>
            </div>
        `
    }
}