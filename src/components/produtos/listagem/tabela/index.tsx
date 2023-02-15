import { Produto } from 'app/models/produtos'
import { useState } from 'react';


interface TabelaProdutosProps {
    produtos: Array<Produto>,
    onEdit: (produto) => void
    onDelete: (produto) => void
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
    produtos,
    onDelete,
    onEdit
}) => {



    return (
        <table className="table is-striped is-hoverable'">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>SKU</th>
                    <th>Nome</th>
                    <th>Preço Custo</th>
                    <th>Preço Venda</th>
                    <th>Tamanho</th>
                    <th>Quantidade</th>
                </tr>
            </thead>
            <tbody>
                {
                    produtos.map(produto => <ProdutoRow onDelete={onDelete}
                        onEdit={onEdit}
                        key={produto.id}
                        produto={produto} />
                    )
                }
            </tbody>
        </table>
    )
}

interface ProdutoRowProps {
    produto: Produto
    onEdit: (produto) => void
    onDelete: (produto) => void
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({
    produto,
    onDelete,
    onEdit
}) => {

    const [deletando, setDeletando] = useState<boolean>(false)

    const onDeleteClick = (produto: Produto) => {
        if (deletando) {
            onDelete(produto)
            setDeletando(false)
        } else {
            setDeletando(true)
        }
    }

    const cancelaDelete = () => setDeletando(false)

    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.precocusto}</td>
            <td>{produto.precovenda}</td>
            <td>{produto.tamanhos}</td>
            <td>{produto.quantidades}</td>
            <td>
                {!deletando &&
                    <button onClick={e => onEdit(produto)}
                        className="button is-success is-rounded is-small">
                        Editar
                    </button>
                }

                <button onClick={e => onDeleteClick(produto)}
                    className="button is-danger is-rounded  is-small">
                    {deletando ? "Confirma?" : "Deletar"}
                </button>

                {deletando &&
                    <button onClick={cancelaDelete}
                        className="button is-rounded is-small">
                        Cancelar
                    </button>
                }
            </td>
        </tr>
    )
}