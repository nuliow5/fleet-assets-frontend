import {useNavigate, useParams} from "react-router-dom";

const DeleteTablet =()=>{
    const {id} = useParams();
    const navigate = useNavigate();

    fetch(`http://localhost:8082/assets/tablets/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error)
        );

    setTimeout(() => {
        navigate('/assets/tablets');
    }, );

    return(
        <>
            delete {id}
        </>
    )
}
export default DeleteTablet;