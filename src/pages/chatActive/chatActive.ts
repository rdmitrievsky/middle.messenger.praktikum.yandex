import { Block } from "../../core";
import validation from "../../utils/inputsVerefications";
import AuthController from "../../core/AuthController";

import './chatActive.scss'

export class chatActive extends Block {
    protected getStateFromProps() {
        // let chats = AuthController.getChats()
        // chats.then(chat => {
        //     const newstate = {
        //         inputs: [],
        //         currentChat: {
        //             title: ''
        //         }
        //     }
        //     chat.forEach(element => {
        //         newstate.inputs.push(element)
        //     });
        //     const activeChat = chat.filter(i => {
        //         return i.id == window.location.search.split('=')[1]
        //     })
        //     newstate.currentChat = { ...activeChat[0] }
        //     this.setState(newstate)
        // })
        this.state = {
            modalIsUp: false,
            currentChat: -1,
            values: {
                message: ''
            },
            errors: {
                message: ''
            },
            qwe: () => {
                // const modal = document.querySelector('modal')
                // modal?.classList.add('chatcontrolmodal_visble')
                // this.state.modalIsUp = true
                
                // this.refs.asddfg.classList.add('chatcontrolmodal_visble')
                // this.state.modalIsUp = true
                let _chatId;
                let chats = AuthController.getChats()
                chats.then(chat => {
                    const activeChat = chat.filter(i => {
                        return i.id == window.location.search.split('=')[1]
                    })
                    const chatId = Number(activeChat[0].id)
                    // this.state.currentChat = chatId
                    _chatId = chatId
                    return AuthController.getChatUsers(chatId)
                }).then(j => {
                    // console.log(this.refs.asddfg)
                    const currentUser = j.find(user => {
                        return user.id === this.props.user.id
                    })
                    const isAdmin = currentUser.role === 'admin' ? true : false
                    // this.state.modalIsUp = true
                    // const qe = Object.keys(this.children).find(i => {
                    //     return (this.children[i]._element as HTMLElement).classList.contains('chatcontrolmodal_visble')
                    // })
                    // this.children[qe].setProps({usersList: j, allowToManage: isAdmin, currentUserId: currentUser.id, currentChatId: this.state.currentChat})
                    const modal = document.querySelector('.chatcontrolmodal')
                    const qw = Object.keys(this.children).find(i => {
                        return this.children[i].element == modal
                    })
                    this.children[qw].setProps({isVisible: true, usersList: j, allowToManage: isAdmin, currentUserId: currentUser.id, currentChatId: _chatId})
                    // this.refs.asddfg.classList.add('chatcontrolmodal_visble')
                })
            },
            onValidate: (e: MouseEvent) => {
                const values = {
                    message: (this.refs.message as HTMLInputElement).value
                }
                const nextState = {
                    errors: {
                        message: validation('message', values.message)
                    },
                    values: { ...values },
                };

                console.log(values.message)
                console.log(this.props)
                this.props.dasocket.send(JSON.stringify({
                    content: values.message,
                    type: 'message',
                }));
                this.props.dasocket.addEventListener('message', event => {
                    // this.props.bee = JSON.parse(event.data)
                    console.log(event)
                });
                this.setState(nextState)

                e.preventDefault()
            },
            singleValidate: (e: { target: HTMLInputElement }) => {
                const target = e.target
                // const currentError: string = (target.nextElementSibling as HTMLBodyElement).innerText
                const values: Record<string, string> = {
                    message: (this.refs.message as HTMLInputElement).value
                }
                const errors = { ...this.state.errors }
                errors[target.name] = validation(target.name, values[target.name]);
                (target.nextElementSibling as HTMLBodyElement).innerText = errors[target.name]
            }
        }
    }
    componentDidMount(props: any): void {
        let token;
        let chatId = 0;
        let socket;
        let asd;
        const iserId = this.props.user.id
        const thisprops = this.props

        const chats = AuthController.getChats()
        chats.then(chat => {
            const activeChat = chat.filter(i => {
                return i.id == window.location.search.split('=')[1]
            })
            chatId = Number(activeChat[0].id)
            return chatId
        }).then(q => {
            return AuthController.getChatToken(q)
        }).then(q => {
            token = q.token
            socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${iserId}/${chatId}/${token}`);
            thisprops.dasocket = socket
            socket.addEventListener('open', () => {
                console.log('Соединение установлено');

                // socket.send(JSON.stringify({
                //     content: 'Моё первое сообщение миру!',
                //     type: 'message',
                // }));

                socket.send(JSON.stringify({
                    content: '0',
                    type: 'get old',
                })); 
            })
            socket.addEventListener('close', event => {
                if (event.wasClean) {
                    console.log('Соединение закрыто чисто');
                } else {
                    console.log('Обрыв соединения');
                }

                console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            });
            
            socket.addEventListener('message', event => {
                const messagesSorted = JSON.parse(event.data)
                const messagesWithData = messagesSorted.map(message => {
                    const d = new Date(message.time)
                    message.formatedTime = {
                        fullDate: d,
                        data: `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`,
                        time: `${d.getHours()}.${d.getMinutes()}`
                    }
                    return message
                }).sort((a, b) => a.formatedTime.fullDate - b.formatedTime.fullDate)
                const unicDates = new Set()
                messagesWithData.forEach(i => {
                    unicDates.add(i.formatedTime.data)
                })
                // console.log(Array.from(unicDates))
                // console.log(messagesWithData)

                const zcxzxxc = Array.from(unicDates).reduce((total, i) => {
                    const qwe = messagesWithData.filter(j => {
                        return j.formatedTime.data == i
                    })
                    return [...total, {'data': i, 'messages': qwe}]
                }, [])

                console.log(zcxzxxc)

                thisprops.wee = zcxzxxc
                thisprops.bee = messagesWithData
            });

            socket.addEventListener('error', event => {
                console.log('Ошибка', event.message);
            });
        })
    }
    render() {
        console.log("RERENDER")
        const { modalIsUp, values, errors } = this.state || {}
        // language=hbs
        return `
        <div class="container container_flex container__chat">
            {{{ChatControlModal ref="asddfg"}}}
            <div class="users">
                <div class="users__user-info">
                    <div>${this.props.user ? this.props.user.display_name ?? this.props.user.first_name : null}</div>
                    {{{Link text="Профиль" classes="users__control" href="/profile"}}}
                </div>
                <label class="users__search"><input type="text" name="user-search"><span>Поиск</span></label>
                <div class="users__wrapper">
                    {{#each inputs}}
                        <a class="user" href="/chat?id={{this.id}}">
                            <div class="user__avatar"></div>
                            <div class="user__info">
                                <div class="user__info__name"><span>{{this.title}}</span></div>
                                <div class="user__info__status"><span>{{this.last_message}}</span></div>
                            </div>
                            <div class="user__date">
                                <div class="user__date__time"><span>10:49</span></div>
                                <div class="user__date__unread"><span>{{this.unread_count}}</span></div>
                            </div>
                        </a>
                    {{/each}}
                </div>
            </div>
            <div class="display">
                <div class="chat-single-info">
                    <div class="user__avatar"></div>
                    <div class="user__info__name"><span>{{currentChat.title}}</span></div>
                    {{{ChatControl onClick=qwe}}}
                </div>
                <div class="chat-table">
                    <div class="chat-table__wrapper">
                        {{#if currentChat.last_message}}
                            <span>asdads</span>
                        {{/if}}
                        {{#each wee}}
                            <span class="date-separator">{{this.data}}</span>
                            {{#each this.messages}}
                                <div class="chat-table__message {{getUsersMessage ../../user.id this.user_id}}">
                                    <span>{{this.content}}</span>
                                    <span class="chat-table__message__time">{{setTime this.time}}</span>
                                </div>
                            {{/each}}
                        {{/each}}
                    </div>
                </div>
                <form>
                    <label class="login__label">
                        {{{Input onChange=singleValidate classes="login__label__input input-message-send" ref="message" name="message" type="message" value="${values.message}"}}}
                        <span class="login__label__span_error">${errors.message}</span>
                    </label>
                    {{{Button onClick=onValidate classes="button message-send" type="prime"}}}
                </form>
            </div>
        </div>
        `
    }
}