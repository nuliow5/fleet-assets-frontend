import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const DeleteSim = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    fetch(`http://localhost:8082/assets/sims/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

    setTimeout(() => {
        navigate('/assets/sims');
    }, );

    return (
        <>
            delete {id}
        </>
    )
}

export default DeleteSim;