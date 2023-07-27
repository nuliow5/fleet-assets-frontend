import {useNavigate, useParams} from "react-router-dom";

const DeletePhone = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    fetch(`http://localhost:8082/assets/phones/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error)
       );

    setTimeout(() => {
        navigate('/assets/phones');
    }, );

    return (
        <>
            delete {id}
        </>
    )
}

export default DeletePhone;