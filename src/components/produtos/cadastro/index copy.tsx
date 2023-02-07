import { useState } from 'react'
import { Layout, Input } from 'components'

export const CadastroProdutos: React.FC = () => {

    const [sku, setSku] = useState('')
    const [precoCusto, setPrecoCusto] = useState('')
    const [nome, setNome] = useState('')
    const [precoVenda, setPrecoVenda] = useState('')
    const [tamanho, setTamanho] = useState('')





    const submit = () => {
        const produto = {
            nome, sku, precoCusto, precoVenda, tamanho
        }
        console.log(produto)
    }

    return (

        <Layout titulo="Produtos">
            <div className='columns'>

                <Input label='Nome do produto: *'
                    columnClasses="is-full" onChange={setNome}
                    value={nome} id='inputNome'
                    placeholder='Digite o nome do produto'></Input>
            </div>
            <div className='columns'>

                <Input label='Código do Produto: *'
                    columnClasses="is-one-quarter" onChange={setSku}
                    value={sku} id='inputSku'
                    placeholder='Digite o Código'></Input>

                <Input label='Preço de Custo: *'
                    columnClasses="is-one-quarter" onChange={setPrecoCusto}
                    value={precoCusto} id='inputPrecoCusto'
                    placeholder='Digite o preço de custo do produto'></Input>

                <Input label='Preço de Venda: *'
                    columnClasses="is-one-quarter" onChange={setPrecoVenda}
                    value={precoVenda} id='inputPrecoVenda'
                    placeholder='Digite o preço de venda do produto'></Input>

                <div className="field column is-one-quarter">
                    <label className="label">Tamanho:</label>
                    <div className="control">
                        <div className="select" >
                            <select value={tamanho} onChange={event => setTamanho(event.target.value)}>
                                <option>RN</option>
                                <option>P</option>
                                <option>M</option>
                                <option>G</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>




            <div className='field is-grouped is-grouped-centered'>
                <div className='control'>
                    <button className='button is-light'>Voltar</button>

                </div>
                <div className='control'>
                    <button className='button is-primary' onClick={submit}>Salvar</button>
                </div>
            </div>
        </Layout>
    )
}