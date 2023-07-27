import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

const EditSim = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const [editSim, setEditSim] = useState(
        {
            id: '',
            iccid: '',
            number: '',
            pin: "",
            operator: '',
            plan: '',
            ip: '',
            activate: ''
        });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const getSim = async () => {
            const reqData = await fetch(`http://localhost:8082/assets/sims/${id}`);
            const resData = await reqData.json();
            setEditSim(resData);
        }
        getSim();
    }, [id]);


    const showInput = (e: any) => {
        setEditSim({...editSim, [e.target.name]: e.target.value});
    }

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        const editInputvalue = {
            id: editSim.id,
            iccid: editSim.iccid,
            number: editSim.number,
            pin: editSim.pin,
            operator: editSim.operator,
            plan: editSim.plan,
            ip: editSim.ip,
            activate: editSim.activate

        };
        console.log(editInputvalue);
        let res = await fetch("http://localhost:8082/assets/sims", {
            method: "PUT",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(editInputvalue)
        });

        let resJson = await res.json();
        if (res.status === 200) {
            setMessage(resJson.success);
            setTimeout(() => {
                navigate('/assets/sims');
            }, 20);

        } else {
            setMessage(resJson.message);
        }

    }

    return (
        <div className={'container'}>
            <div>
                <p><h2>Edit sim [id:{id}] </h2></p>
                <p className="success_insert"> {message} </p>
            </div>
            <div>
                <form onSubmit={handleUpdate}>

                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label htmlFor={""}>IccId*</label>
                            <input type={'number'} name={'iccid'}
                                   value={editSim.iccid}
                                   onChange={showInput}
                                   required={true}
                            />
                            <div className={'underline'}></div>

                        </div>

                        <div className={'input-data'}>
                            <label htmlFor={""}>Number*</label>
                            <input type={'number'} name={'number'}
                                   value={editSim.number}
                                   onChange={showInput}
                                   required={true}/>
                            <div className={'underline'}></div>

                        </div>
                    </div>

                    <div className="form-row">
                        <div className={'input-data'}>
                            <label htmlFor={""}>Pin</label>
                            <input type={'number'} name={'pin'}
                                   value={editSim.pin}
                                   onChange={showInput}
                                   required={false}/>
                            <div className={'underline'}></div>


                        </div>

                        <div className={'input-data'}>
                            <label htmlFor={""}>Operator* </label>
                            <select className={''} name={'operator'}
                                    value={editSim.operator}
                                    onChange={showInput}
                                    required={true}>
                                <option value={''}>-- Please select --</option>
                                <option value={'0'}>TELIA</option>
                                <option value={'1'}>BITE</option>
                                <option value={'2'}>TELE2</option>
                            </select>

                            {/*<div className={'underline'}></div>*/}

                        </div>
                    </div>

                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label htmlFor={""}>Plan*</label>
                            <input type={'text'} name={'plan'}
                                   value={editSim.plan}
                                   onChange={showInput}
                                   required={true}/>
                            <div className={'underline'}></div>

                        </div>
                        <div className={'input-data'}>
                            <label htmlFor={""}>Ip</label>
                            <input type={'text'} name={'ip'}
                                   value={editSim.ip}
                                   onChange={showInput}
                                   required={false}/>
                            <div className={'underline'}></div>

                        </div>
                    </div>
                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label>Activate*</label>
                            <input type={'date'} name={'activate'}
                                   value={editSim.activate}
                                   onChange={showInput}
                                   required={false}/>
                            <div className={'underline'}></div>


                        </div>

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

export default EditSim;