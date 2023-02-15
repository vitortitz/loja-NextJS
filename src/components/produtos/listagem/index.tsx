import { useEffect } from 'react'
import { Layout } from 'components'
import Link from 'next/link'
import { TabelaProdutos } from './tabela'
import { Produto } from 'app/models/produtos'
import useSWR from 'swr'
import { httpClient } from 'app/http'
import { Loader } from 'components'
import { AxiosResponse } from 'axios';
import Router from 'next/router'
import { useProdutoService } from 'app/services'
import { useState } from 'react';
import { Alert } from 'components/common/message';


export const ListagemProdutos: React.FC = () => {

    const [message, setMessage] = useState<Array<Alert>>([])
    const service = useProdutoService()
    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>('api/produtos', url => httpClient.get(url))
    const [lista, setLista] = useState<Produto[]>([])

    useEffect(() => {
        setLista(result?.data || [])
    }, [result])


    const editar = (produto: Produto) => {
        const url = `/cadastros/produto?id=${produto.id}`
        Router.push(url)
    }

    const deletar = (produto: Produto) => {
        service.deletar(produto.id).then(response => {
            setMessage([
                { tipo: "success", texto: "Produto excluido com sucesso!" }
            ])
            const listaAlterada: Produto[] = lista?.filter(p => p.id !== produto.id)
            setLista(listaAlterada)
        })
    }



    return (
        <Layout titulo='Produtos' mensagens={message}>
            <Link href={'/cadastros/produto'}>
                <button className='button is-warning'>Novo</button>
            </Link>
            <br />
            <br />
            <Loader show={!result} />
            <TabelaProdutos onDelete={deletar} onEdit={editar} produtos={lista} />
        </Layout>
    )
}