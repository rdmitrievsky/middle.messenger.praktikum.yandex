import { Block } from "../../core";

import './chat.sass'

export class Chat extends Block {
    render() {
        // language=hbs
        return `
        <div class="container container_flex">
            <div class="users">
                {{{Link text="Профиль" classes="users__control" href="/profile"}}}
                <label class="users__search"><input type="text" name="user-search"><span>Поиск</span></label>
                <div class="users__wrapper">
                    <a class="user" href="/chat/chat-dialog/chatdialog.html">
                        <div class="user__avatar"></div>
                        <div class="user__info">
                            <div class="user__info__name"><span>John Doe</span></div>
                            <div class="user__info__status"><span>bebebe</span></div>
                        </div>
                        <div class="user__date">
                            <div class="user__date__time"> <span>10:49</span></div>
                        </div>
                    </a>
                    <a class="user" href="/chat/chat-dialog/chatdialog.html">
                        <div class="user__avatar"></div>
                        <div class="user__info">
                            <div class="user__info__name"><span>John Doe1</span></div>
                            <div class="user__info__status"><span>bebebe</span></div>
                        </div>
                        <div class="user__date">
                            <div class="user__date__time"> <span>10:49</span></div>
                            <div class="user__date__unread"> <span>3</span></div>
                        </div>
                    </a>
                    <a class="user" href="/chat/chat-dialog/chatdialog.html">
                        <div class="user__avatar"></div>
                        <div class="user__info">
                            <div class="user__info__name"><span>John Doe2</span></div>
                            <div class="user__info__status"><span>bebebe</span></div>
                        </div>
                        <div class="user__date">
                            <div class="user__date__time"> <span>10:49</span></div>
                            <div class="user__date__unread"> <span>1</span></div>
                        </div>
                    </a>
                    <a class="user" href="/chat/chat-dialog/chatdialog.html">
                        <div class="user__avatar"></div>
                        <div class="user__info">
                            <div class="user__info__name"><span>John Doe3</span></div>
                            <div class="user__info__status"><span>bebebe</span></div>
                        </div>
                        <div class="user__date">
                            <div class="user__date__time"> <span>10:49</span></div>
                        </div>
                    </a>
                    <a class="user" href="/chat/chat-dialog/chatdialog.html">
                        <div class="user__avatar"></div>
                        <div class="user__info">
                            <div class="user__info__name"><span>John Doe4</span></div>
                            <div class="user__info__status"><span>bebebe</span></div>
                        </div>
                        <div class="user__date">
                            <div class="user__date__time"> <span>10:49</span></div>
                        </div>
                    </a>
                    <a class="user" href="/chat/chat-dialog/chatdialog.html">
                        <div class="user__avatar"></div>
                        <div class="user__info">
                            <div class="user__info__name"><span>John Doe5</span></div>
                            <div class="user__info__status"><span>bebebe</span></div>
                        </div>
                        <div class="user__date">
                            <div class="user__date__time"> <span>10:49</span></div>
                            <div class="user__date__unread"> <span>1</span></div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="display"><span>Выберите чат чтобы отправить сообщение</span></div>
        </div>
        `
    }
}