import { useState } from 'react'
import { Layout, Input } from 'components'
import { HtmlHTMLAttributes } from 'react'
export const CadastroProdutos: React.FC = () => {

    const [sku, setSku] = useState('')
    const [precoCusto, setPrecoCusto] = useState('')
    const [nome, setNome] = useState('')
    const [precoVenda, setPrecoVenda] = useState('')
    const [tamanhos, setTamanhos] = useState([])
    const [quantidades, setQuantidades] = useState([])
    const [isDisabled, setDisable] = useState(false)



    const submit = () => {
        const produto = {
            nome, sku, precoCusto, precoVenda, tamanhos, quantidades
        }
        console.log(produto)
    }

    const addInputButton = (e) => {
        e.preventDefault()
        if (tamanhos.length <= 4) {
            setTamanhos([...tamanhos, ""]);
            setQuantidades([...quantidades, ""])
            if (tamanhos.length >= 4) {
                setDisable(true)
            }
        }

    }


    const handleChangeTamanho = (e, index) => {
        tamanhos[index] = e.target.value;
        setTamanhos([...tamanhos])
    }



    const handleChangeQuantidade = (e, index) => {
        quantidades[index] = e.target.value;
        setQuantidades([...quantidades])
    }

    const handleRemoveInput = (position) => {
        setTamanhos([...tamanhos.filter((_, index) => index != position)])
        setQuantidades([...quantidades.filter((_, index) => index != position)])
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
            </div>
            <div className='columns '>
                {
                    tamanhos.map((tamanho, index) => (

                        <div key={index} className="field column">
                            <label htmlFor={`tamanho ${index + 1}`} className="label">{`Tamanho ${index + 1} `}</label>
                            <div className="control">
                                <div className="select" >
                                    <select name='tamanho' id={`tamanho ${index + 1}`}
                                        value={tamanho}
                                        onChange={event => handleChangeTamanho(event, index)}
                                    >
                                        <option>RN</option>
                                        <option>P</option>
                                        <option>M</option>
                                        <option>G</option>
                                    </select>
                                </div>
                                <button className='button is-danger'
                                    onClick={() => { handleRemoveInput(index) }}>Deletar</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='columns'>
                {
                    quantidades.map((quantidade, index) => (

                        <div key={index} className="field column ">
                            <label htmlFor={`quantidade ${index}`} className="label">{`Quantidade ${index + 1} `}</label>
                            <div className="control">
                                <input className="input" name='quantidade'
                                    value={quantidade}
                                    id='{`quantidade ${index}`}' onChange={event => handleChangeQuantidade(event, index)}
                                    type="number" placeholder={`Quantidade ${index + 1}:`} />
                            </div>

                        </div>
                    ))
                }
            </div>
            <div className='columns column is-one-quarter' >
                <div className='field'>
                    <div className='control'>
                        <button className='button is-light' id='add+' disabled={isDisabled} onClick={addInputButton}>Adicionar outro tamanho</button>
                    </div>
                </div>
            </div>



            <div className='field is-grouped is-grouped-centered'>
                <div className='control'>
                    <button className='button is-warning'>Voltar</button>
                </div>
                <div className='control'>
                    <button className='button is-primary' onClick={submit}>Salvar</button>
                </div>
            </div>
        </Layout>
    )
}