import { Cliente } from "app/models/clientes"
import { useFormik } from 'formik'
import { Input, InputCPF, InputDate, InputPhone } from 'components/common/input'
interface ClienteFormProps {
    cliente: Cliente
    onSubmit: (cliente: Cliente) => void
}
const formScheme: Cliente = {
    aniversario: '',
    cpf: '',
    id: '',
    nome: '',
    telefone: ''
}
export const ClienteForm: React.FC<ClienteFormProps> = ({
    cliente,
    onSubmit
}) => {

    const formik = useFormik<Cliente>({
        initialValues: { ...formScheme, ...cliente },
        onSubmit,

    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="columns">
                <Input id='nome' autoComplete="off" label='Nome: *'
                    name='nome' onChange={formik.handleChange} value={formik.values.nome} />
            </div>
            <div className="columns">
                <InputCPF columnClasses="is-one-thid" id='cpf' autoComplete="off" label='Cpf:'
                    name='cpf' onChange={formik.handleChange} value={formik.values.cpf} />
                <InputPhone columnClasses="is-one-thid" id='telefone' autoComplete="off" label='Telefone:'
                    name='telefone' onChange={formik.handleChange} value={formik.values.telefone} />
                <InputDate columnClasses="is-one-thid" id='aniversario' autoComplete="off" label='Aniversario:'
                    name='aniversario' onChange={formik.handleChange} value={formik.values.aniversario} />
            </div>

            <div className="field is-grouped">
                <div className="control is-link">
                    <button type="submit" className="button">
                        {formik.values.id ? 'Atualizar' : 'Salvar'}
                    </button>
                </div>

            </div>
        </form>
    )
}