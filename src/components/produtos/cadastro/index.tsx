import { useState, useEffect } from 'react'
import { Layout, Input, InputMoney } from 'components'
import { useProdutoService } from 'app/services'
import { Produto } from 'app/models/produtos'
import { converterEmBigDecimal, formatReal } from 'app/util/money'
import { Message } from 'components/common/message'
import { Alert } from 'components/common/message'
import { object, string, number, date, InferType, array } from 'yup';
import Link from 'next/link'
import { useRouter } from 'next/router'
import '@fortawesome/fontawesome-free/css/all.min.css'


const msgObrigatoria = '*Campo Obrigatório'
const msgValor = '*PREÇO deve ser maior que 0'
const validationSchame = object({


    nome: string().trim().required(msgObrigatoria),
    precocusto: number().moreThan(0, msgValor).required(),
    precovenda: number().moreThan(0, msgValor).required(),
    quantidades: array(number().moreThan(0, msgValor).required()),
    sku: string().trim().required(msgObrigatoria),
})

interface FormErros {
    sku?: string,
    precocusto?: string,
    precovenda?: string,
    nome?: string
    quantidades?: string
}




export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string>('')
    const [precocusto, setprecocusto] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [precovenda, setprecovenda] = useState<string>('')
    const [tamanhos, setTamanhos] = useState(['RN'])
    const [quantidades, setQuantidades] = useState(['0'])
    const [isDisabled, setDisable] = useState(false)
    const [id, setId] = useState<string>('')
    const [message, setMessage] = useState<Array<Alert>>([])
    const [errors, setErrors] = useState<FormErros>({})
    const router = useRouter()
    const { id: queryId } = router.query

    useEffect(() => {
        service.carregarProduto(queryId).then(produtoEncontrado => {
            if (queryId) {
                setId(produtoEncontrado.id)
                setSku(produtoEncontrado.sku)
                setNome(produtoEncontrado.nome)
                setprecocusto(produtoEncontrado.precocusto.toString())
                setprecovenda(produtoEncontrado.precovenda.toString())
                setTamanhos(produtoEncontrado.tamanhos)
                setQuantidades(produtoEncontrado.quantidades)
            }
        }).catch(err => {
        })
    }, [queryId])

    const submit = () => {
        const produto: Produto = {
            id,
            nome,
            sku,
            precocusto: converterEmBigDecimal(precocusto),
            precovenda: converterEmBigDecimal(precovenda),
            tamanhos,
            quantidades
        }

        validationSchame.validate(produto).then(obj => {
            setErrors({})
            if (id) {
                service.atualizar(produto).then(response => {
                    setMessage([{
                        tipo: "success", texto: "Produto atualizado com sucesso!"
                    }])
                })
            } else {
                service.salvar(produto).then(produtoResposta => {
                    setId(produtoResposta.id)
                    setMessage([{
                        tipo: "success", texto: "Produto salvo com sucesso!"
                    }])
                })
            }

        }).catch(err => {
            const field = err.path
            const message = err.message
            setErrors({
                [field]: message
            })
        })
    }
    const salvarEDuplicar = () => {
        const produto: Produto = {
            id,
            nome,
            sku,
            precocusto: converterEmBigDecimal(precocusto),
            precovenda: converterEmBigDecimal(precovenda),
            tamanhos,
            quantidades
        }

        validationSchame.validate(produto).then(obj => {
            setErrors({})
            service.salvar(produto).then(produtoResposta => {
                setMessage([{
                    tipo: "success", texto: "Produto salvo com sucesso!"
                }])
                setSku('')
                setQuantidades([''])
            })
        }).catch(err => {
            const field = err.path
            const message = err.message
            setErrors({
                [field]: message
            })

        })
    }

    const addInputButton = (e) => {
        e.preventDefault()
        if (tamanhos.length <= 4) {
            setTamanhos([...tamanhos, "RN"]);
            setQuantidades([...quantidades, "0"])
            console.log(tamanhos.length)
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
        setDisable(false)
    }
    const refresh = () => {
        router.reload()
    }

    return (

        <Layout titulo="Produtos" mensagens={message}>
            <div className='columns'>
                <Input label='Nome do produto: *'
                    columnClasses="is-full" onChange={e => setNome(e.target.value)}
                    value={nome} id='inputNome'
                    placeholder='Digite o nome do produto'
                    error={errors.nome}></Input>
            </div>

            <div className='columns'>
                {id &&
                    <Input label='Código do Produto: *'
                        columnClasses="is-one-fifth"
                        value={id} id='inputId' disabled />

                }
                <Input label='SKU: *'
                    columnClasses="is-one-quarter" onChange={e => setSku(e.target.value)}
                    value={sku} id='inputSku'
                    placeholder='Digite o Código'
                    error={errors.sku} />

                <InputMoney label='Preço de Custo: *'
                    columnClasses="is-one-quarter" onChange={e => setprecocusto(e.target.value)}
                    value={precocusto} id='inputprecocusto' maxLength={6}
                    placeholder='Digite o preço de custo do produto'
                    error={errors.precocusto} />

                <InputMoney label='Preço de Venda: *'
                    columnClasses="is-one-quarter" onChange={e => setprecovenda(e.target.value)}
                    value={precovenda} id='inputprecovenda' maxLength={6}
                    placeholder='Digite o preço de venda do produto'
                    error={errors.precovenda} />
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
                                        onChange={event => handleChangeTamanho(event, index)}>
                                        <option value={'RN'}>RN</option>
                                        <option value={'P'}>P</option>
                                        <option value={'M'}>M</option>
                                        <option value={'G'}>G</option>
                                    </select>
                                </div>
                                {
                                    tamanhos.length > 1 && <button className='button is-danger'
                                        onClick={() => { handleRemoveInput(index) }}>Deletar</button>
                                }

                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='columns'>
                {quantidades.map((quantidade, index) => (
                    <div key={index} className="field column ">
                        <label htmlFor={`quantidade ${index}`} className="label">{`Quantidade ${index + 1} `}</label>
                        <div className="control">
                            <input className="input" name='quantidade'
                                value={quantidade}
                                id='{`quantidade ${index}`}' onChange={event => handleChangeQuantidade(event, index)}
                                type="number" placeholder={`Quantidade ${index + 1}:`} />
                            {
                                errors &&
                                <p className='help is-danger'>
                                    {errors.quantidades}
                                </p>
                            }
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
                {
                    !id ? <div className='control'>
                        <Link href={'/consultas/produto'}>
                            <button className='button is-warning' onClick={submit}>
                                <span className="icon is-small">
                                    <i className="fas fa-chart-simple" />
                                </span>
                                <span>
                                    Consultas
                                </span>
                            </button>
                        </Link>
                    </div> :
                        <div className='control'>
                            <button className='button is-warning' onClick={refresh}>
                                <span className='icon is-small'>
                                    <i className='fas fa-arrow-left' />
                                </span>
                                <span>
                                    Voltar
                                </span>
                            </button>
                        </div>
                }

                <div className="buttons">
                    <button className='button is-primary' onClick={submit}>
                        <span className="icon is-small">
                            <i className="fas fa-check" />
                        </span>
                        <span>{id ? "Atualiazar" : "Salvar"}
                        </span>
                    </button>
                    {!id &&
                        <button className="button is-info" onClick={salvarEDuplicar}>
                            <span className='icon is-small'>
                                <i className='fas fa-recycle' />
                            </span>
                            <span>
                                Salvar e Duplicar
                            </span>
                        </button>
                    }
                </div>
            </div>
        </Layout>
    )
}
