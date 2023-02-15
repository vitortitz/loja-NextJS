import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css'
export const Menu: React.FC = () => {
    return (
        <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">

            <p className="menu-label is-hiden-touch">
                <span className="icon is-small">
                    <i className="fas fa-bars" />
                </span>
                <span>
                    Minhas Vendas
                </span>
            </p>
            <ul className="menu-list">
                <MenuItem href="/" label="Home" />
                <MenuItem href="/cadastros/produto" label="Produtos" />
                <MenuItem href="/cadastros/cliente" label="Clientes" />
                <MenuItem href="/" label="Config" />
            </ul>
        </aside>
    )
}

interface MenuItemProps {
    href: string;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
    return (
        <li>
            <Link href={props.href}>
                <span className="icon"></span> {props.label}
            </Link>

        </li>
    )
}