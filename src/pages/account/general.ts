import { Block } from "../../core";

import './general.sass'

export class Account extends Block {
    render() {
        // language=hbs
        return `
        <div class="container container_flex">
            <a class="button" href="/chat">
                <div></div>
            </a>
            <div class="display">
                <section class="name-avatar"><button id="changeAvatar"></button><span>Иван</span></section>
                <section class="user-info">
                    <div class="user-info__item"><span class="user-info__item_bold">Почта</span><span class="user-info__item_light">pochta@yandex.ru</span></div>
                    <div class="user-info__item"><span class="user-info__item_bold">Логин</span><span class="user-info__item_light">ivanivanov</span></div>
                    <div class="user-info__item"><span class="user-info__item_bold">Имя</span><span class="user-info__item_light">Иван</span></div>
                    <div class="user-info__item"><span class="user-info__item_bold">Фамилия</span><span class="user-info__item_light">Иванов</span></div>
                    <div class="user-info__item"><span class="user-info__item_bold">Имя в чате</span><span class="user-info__item_light">Иван</span></div>
                    <div class="user-info__item"><span class="user-info__item_bold">Телефон</span><span class="user-info__item_light">+7 (909) 967 30 30</span></div>
                </section>
                <section class="user-control">
                    {{{Link text="Изменить данные" classes="user-control__item" childrenClass="user-control__item_blue" href="/editprofile"}}}
                    {{{Link text="Изменить пароль" classes="user-control__item" childrenClass="user-control__item_blue" href="/editpassword"}}}
                    {{{Link text="Выйти" classes="user-control__item" childrenClass="user-control__item_red" href="/"}}}
                </section>
            </div>
        </div>
        `
    }
}