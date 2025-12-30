interface IValidateStringOptions {
    max?: number,
    min?: number,
    required?: boolean,
}

export function validateString(item: string, options: IValidateStringOptions = {}): boolean {
    if (options.max && item.length > options.max)
        return false
    
    if (options.min && item.length < options.min)
        return false

    if (options.required && item === "")
        return false

    return true
}


interface IValidateEnumOptions {
    required?: boolean,
}

export function validateEnum(item: number, options: IValidateEnumOptions = {}): boolean {
    if (options.required && item === 0) {
        return false
    }

    return true
}