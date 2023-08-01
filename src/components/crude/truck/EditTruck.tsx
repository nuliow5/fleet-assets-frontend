import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Switch} from "antd";

const EditTruck = () => {
    const {id} = useParams();

    const navigate = useNavigate();

    const [editTruck, setEditTruck] = useState(
        {
            id: '',
            licensePlate: '',
            model: '',
            isWork: '',
            workRegion: ''
        });

    const [message, setMessage] = useState('');

    const onChange = (checked: any) => {
        // console.log(`${checked}`);
        let updatedForm = editTruck;
        updatedForm.isWork = checked;
        setEditTruck(updatedForm);
    };

    useEffect(() => {
        const getTruck = async () => {
            const reqData = await fetch(`http://localhost:8082/trucks/${id}`);
            const resData = await reqData.json();
            setEditTruck(resData);
        }
        getTruck();
    }, [id]);

    const showInput = (e: any) => {
        setEditTruck({...editTruck, [e.target.name]: e.target.value});
    }

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        const editInputvalue = {
            id: editTruck.id,
            licensePlate: editTruck.licensePlate,
            model: editTruck.model,
            isWork: editTruck.isWork,
            workRegion: editTruck.workRegion

        };
        console.log(editInputvalue);
        let res = await fetch("http://localhost:8082/trucks", {
            method: "PUT",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(editInputvalue)
        });

        let resJson = await res.json();
        if (res.status === 200) {
            setMessage(resJson.success);
            setTimeout(() => {
                navigate('/trucks');
            }, 20);

        } else {
            setMessage(resJson.message);
        }

    }

    return(
        <div className={'container'}>
            <div>
                <p><h2>Edit truck [id:{id}] </h2></p>
                <p className="success_insert"> {message} </p>
            </div>
            <div>
                <form onSubmit={handleUpdate}>

                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label htmlFor={""}>License plate*</label>
                            <input type={'text'} name={'licensePlate'}
                                   value={editTruck.licensePlate}
                                   onChange={showInput}
                                   required={true}
                            />
                            <div className={'underline'}></div>

                        </div>

                        <div className={'input-data'}>
                            <label htmlFor={""}>Model</label>
                            <input type={'text'} name={'model'}
                                   value={editTruck.model}
                                   onChange={showInput}
                                   required={false}/>
                            <div className={'underline'}></div>

                        </div>
                    </div>

                    <div className="form-row">
                        <div className={'input-data'}>
                            <div className={'toggle_div'}>
                                <label htmlFor={""}>Is work* </label>
                                <Switch onClick={onChange}/>
                            </div>

                        </div>

                        <div className={'input-data'}>
                            <label htmlFor={""}>Work region* </label>
                            <select className={''} name={'workRegion'}
                                    value={editTruck.workRegion}
                                    onChange={showInput}
                                    required={true}>
                                <option value={''}>-- Please select --</option>
                                <option value={'0'}>EUROPE</option>
                                <option value={'1'}>BALTIC</option>
                            </select>

                            {/*<div className={'underline'}></div>*/}

                        </div>
                    </div>


                    <div className={'form-row'}>


                        <div className={'input-data'}>

                            <label htmlFor={""}></label>
                            <button type={'submit'} className={'btn-success'}>Submit</button>

                        </div>
                    </div>


                </form>
            </div>

        </div>
    )
}
export default EditTruck;