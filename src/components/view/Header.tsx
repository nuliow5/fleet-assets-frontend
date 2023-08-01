import Nav from "./Nav";
var logo = require("../../images/logo-no-background.png");
const Header = () => {
    return (<header>
        <div className={'logo'}>
            <img  src={logo} className={"webLogo"}/>
            {/*Fleet assets*/}
        </div>
        <div></div>

    </header>)
}

export default Header;