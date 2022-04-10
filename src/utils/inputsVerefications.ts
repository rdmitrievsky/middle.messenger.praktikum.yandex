export default function validation(type: string, qwe: string): string {
    console.log(type)
    interface adasd {
        min: () => number;
        max: () => number;
    }
    const lengths: adasd = {
        min: () => {
            if (type === 'login') {
                return 4
            } else if (type === 'password') {
                return 8
            } else {
                return 0
            }
        },
        max: () => {
            if (type === 'login') {
                return 20
            } else if (type === 'password') {
                return 40
            } else {
                return 999
            }
        }
    }

    if (qwe.length < lengths.min()) {
        return 'Недостаточно символов'
    } else if (qwe.length > lengths.max()) {
        return 'Слишком много символов'
    }

    if (type === 'login') {
    
        if (/^\d+$/.test(qwe)) {
            return 'Не может содержать только цифры'
        }
        
        if (/\s/.test(qwe)) {
            return 'Не может содержать пробел'
        }

        if (!/^[A-Za-z0-9_-]*$/.test(qwe)) {
            return 'Не может содержать спецсимволы'
        }
    }

    if (type === 'password') {

        if (/^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,40})$/.test(qwe)) {
            return ''
        } else {
            return 'Должен содержать заглавную букву и цифру'
        }
    }

    if (type === 'firstname' || type === 'secondname') {

        if (/^([A-ZА-Я])[а-яА-Яa-zA-Z]/.test(qwe)) {
            return ''
        } else {
            return "Первая буква должна быть заглавной"
        }
    }

    if (type === 'email') {

        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(qwe)) {
            return ''
        } else {
            return 'некорректный адрес почты'
        }

    }

    if (type === 'phone') {

        if (/^([0-9+])\d{10,15}$/.test(qwe)) {
            return ''
        } else {
            return 'некорректный номер телеофна'
        }

    }

    return ''
}