export default function validation(type: string, qwe: string): string {
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
                return 0
            }
        }
    }

    if (qwe.length < lengths.min()) {
        return 'too short'
    } else if (qwe.length > lengths.max()) {
        return 'too long'
    }

    if (type === 'login') {
    
        if (/^\d+$/.test(qwe)) {
            return 'cant contains numbers only'
        }
        
        if (/\s/.test(qwe)) {
            return 'no space allowed'
        }

        if (!/^[A-Za-z0-9_-]*$/.test(qwe)) {
            return 'no special symbols allowed'
        }
    }

    if (type === 'password') {
        return ''
    }

    return ''
}