export default function validation(type: string, inputValue: string): string {
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

    if (inputValue.length < lengths.min()) {
        return 'Недостаточно символов'
    } else if (inputValue.length > lengths.max()) {
        return 'Слишком много символов'
    }

    if (type === 'login') {
    
        if (/^\d+$/.test(inputValue)) {
            return 'Не может содержать только цифры'
        }
        
        if (/\s/.test(inputValue)) {
            return 'Не может содержать пробел'
        }

        if (!/^[A-Za-z0-9_-]*$/.test(inputValue)) {
            return 'Не может содержать спецсимволы'
        }
    }

    if (type === 'password') {

        if (/^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,40})$/.test(inputValue)) {
            return ''
        } else {
            return 'Должен содержать заглавную букву и цифру'
        }
    }

    if (type === 'firstname' || type === 'secondname') {

        if (/^([A-ZА-Я])[а-яА-Яa-zA-Z]/.test(inputValue)) {
            return ''
        } else {
            return "Первая буква должна быть заглавной"
        }
    }

    if (type === 'email') {
        //eslint-disable-next-line
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(inputValue)) {
            return ''
        } else {
            return 'некорректный адрес почты'
        }

    }

    if (type === 'phone') {

        if (/^([0-9+])\d{10,15}$/.test(inputValue)) {
            return ''
        } else {
            return 'некорректный номер телеофна'
        }

    }

    return ''
}