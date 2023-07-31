import Nav from "./Nav";

const Menu = () => {
    // return <div className={'sidebar'}>
    // <Nav/>

    return (
        <nav className={'sidebar'}>
            <>
                <ul>
                    <li>
                        <a href="/trucks">
                            <i className={"fa fa-truck fa-lg"}></i>
                            <span className={"nav-text"}>TRUCKS</span>
                        </a>
                    </li>


                    <li className={"darkerlishadow"}>
                        <a href="/assets/sims">
                            <i className={"fa fa-mobile fa-lg"}></i>
                            <span className={"nav-text"}>SIMS</span>
                        </a>
                    </li>

                    <li className={"darkerli"}>
                        <a href="/assets/tablets">
                            <i className={"fa fa-tablet fa-lg"}></i>
                            <span className={"nav-text"}>TABLETS</span>
                        </a>
                    </li>

                    <li className={"darkerli"}>
                        <a href="/assets/phones">
                            <i className={"fa fa-phone-square fa-lg"}></i>
                            <span className={"nav-text"}>PHONES</span>
                        </a>
                    </li>
                    <li className={"darkerlishadow"}>

                    </li>
                </ul>
            </>

        </nav>
    )
}

export default Menu;