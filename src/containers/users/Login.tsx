import Admin from "./Admin";
import UserUser from "./UserUser";


const Login = (props: any) => {
    function doLogin(loginValue: any) {
        if (loginValue === 'admin') {
           return <Admin {...props} />
        }
        return <UserUser loginName={props.loginName}/>
    }

    return (
        <div>{doLogin(props.loginName)} </div>
    )
}


export default Login;
