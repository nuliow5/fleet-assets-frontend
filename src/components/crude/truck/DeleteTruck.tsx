import {useNavigate, useParams} from "react-router-dom";

const DeleteTruck = () => {
    const {id} = useParams();

    const navigate = useNavigate();

    fetch(`http://localhost:8082/trucks/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error)
        );

    setTimeout(() => {
        navigate('/trucks');
    }, );

    return(
        <>
            delete {id}
        </>
    )
}

export default DeleteTruck;