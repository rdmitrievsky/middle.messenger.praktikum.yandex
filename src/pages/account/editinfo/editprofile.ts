import { Block } from "../../../core";

import './editinfo.sass'

export class EditProfile extends Block {
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
                            <span>Почта</span>
                            {{{Input ref="email" type="text" placeholder="pochta@yandex.ru" name="email"}}}
                        </label>
                        <label>
                            <span>Логин</span>
                            {{{Input ref="loginName" type="text" placeholder="ivanivanov" name="login"}}}
                        </label>
                        <label>
                            <span>Имя</span>
                            {{{Input ref="first_name" type="text" placeholder="Иван" name="first_name"}}}
                        </label>
                        <label>
                            <span>Фамилия</span>
                            {{{Input ref="second_name" type="text" placeholder="Иванов" name="second_name"}}}
                        </label>
                        <label>
                            <span>Имя в чате</span>
                            {{{Input ref="display_name" type="text" placeholder="Иван" name="display_name"}}}
                        </label>
                        <label>
                            <span>Телефон</span>
                            {{{Input ref="phone" type="text" placeholder="+7 (909) 967 30 30" name="phone"}}}
                        </label>
                    </section>
                    {{{Button text="Сохранить" type="prime" onClick=onValidate}}}
                </div>
            </div>
        `
    }
}