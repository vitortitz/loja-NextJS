import { InputHTMLAttributes } from 'react'
import { formatReal } from 'app/util/money'
import { FormatUtils } from '@4us-dev/utils'

const formatUtils = new FormatUtils()

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string
    label: string
    columnClasses?: string
    error?: string
    formatter?: (value: string) => string

}
export const Input: React.FC<InputProps> = ({
    label,
    columnClasses,
    id,
    error,
    formatter,
    onChange,
    ...inputProps
}: InputProps) => {

    const onInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const formattedValue = (formatter && formatter(value as string) || value)

        onChange({
            ...event,
            target: {
                name,
                value: formattedValue
            }
        })

    }

    return (
        <div className={`field column ${columnClasses}`}>
            <label className='label' htmlFor={id}>{label}</label>
            <div className='control'>
                <input className='input' id={id} {...inputProps}
                    onChange={onInputChange} />
                {
                    error &&
                    <p className='help is-danger'>
                        {error}
                    </p>
                }
            </div>
        </div>
    )
}

export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
    return (
        <Input {...props} formatter={formatReal} />
    )
}

export const InputCPF: React.FC<InputProps> = (props: InputProps) => {
    return (
        <Input {...props} formatter={formatUtils.formatCPF} />
    )
}

export const InputPhone: React.FC<InputProps> = (props: InputProps) => {
    return (
        <Input {...props} formatter={formatUtils.formatPhone} />
    )
}

export const InputDate: React.FC<InputProps> = (props: InputProps) => {
    const formatData = (value: string) => {
        if (!value) {
            return "";
        }
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1");
    };

    return <Input {...props} maxLength={5} formatter={formatData} />;
};