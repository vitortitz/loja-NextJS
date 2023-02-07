interface MensagemProps {
    mensagem: String;
}

const Mensagem: React.FC<MensagemProps> = (props: any) => {
    return (
        <div>
            {props.mensagem}
        </div>
    )
}


const MeuComponente = () => {
    return (
        <div>
            <Mensagem mensagem="dasdasdsdsadas" />
        </div>
    )
}
export default MeuComponente;