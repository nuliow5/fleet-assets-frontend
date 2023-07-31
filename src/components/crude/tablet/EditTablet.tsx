import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

const EditTablet = () => {
    const {id} = useParams();

    const navigate = useNavigate();

    const [editTablet, setEditTablet] = useState(
        {
            id: '',
            model: "",
            imei: "",
            number: "",
            orderNumber: "",
            simNumber: "",
            // truckLicensePlate: "",
            dateOfPurchase: "",
            chargerType: ""
        });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const getTablet = async () => {
            const reqData = await fetch(`http://localhost:8082/assets/tablets/${id}`);
            const resData = await reqData.json();
            setEditTablet(resData);
        }
        getTablet();
    }, [id]);

    const showInput = (e: any) => {
        setEditTablet({...editTablet, [e.target.name]: e.target.value});
    }

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        const editInputvalue = {
            id: editTablet.id,
            model: editTablet.model,
            imei: editTablet.imei,
            number: editTablet.number,
            orderNumber: editTablet.orderNumber,
            simNumber: editTablet.simNumber,
            // truckLicensePlate: "",
            dateOfPurchase: editTablet.dateOfPurchase,
            chargerType:editTablet.chargerType

        };
        console.log(editInputvalue);
        let res = await fetch("http://localhost:8082/assets/tablets", {
            method: "PUT",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(editInputvalue)
        });

        let resJson = await res.json();
        if (res.status === 200) {
            setMessage(resJson.success);
            setTimeout(() => {
                navigate('/assets/tablets');
            }, 20);

        } else {
            setMessage(resJson.message);
        }

    }


    return (
        <div className={'container'}>
            <div>
                <p><h2>Edit tablet [id:{id}] </h2></p>
                <p className="success_insert"> {message} </p>
            </div>
            <div>
                <form onSubmit={handleUpdate}>

                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label htmlFor={""}>Model</label>
                            <input type={'text'} name={'model'}
                                   value={editTablet.model}
                                   onChange={showInput}
                                   required={false}
                            />
                            <div className={'underline'}></div>

                        </div>

                        <div className={'input-data'}>
                            <label htmlFor={""}>Imei*</label>
                            <input type={'number'} name={'imei'}
                                   value={editTablet.imei}
                                   onChange={showInput}
                                   required={true}/>
                            <div className={'underline'}></div>

                        </div>
                    </div>

                    <div className="form-row">
                        <div className={'input-data'}>
                            <label htmlFor={""}>Number*</label>
                            <input type={'text'} name={'number'}
                                   value={editTablet.number}
                                   onChange={showInput}
                                   required={true}/>
                            <div className={'underline'}></div>


                        </div>

                        <div className={'input-data'}>
                            <label htmlFor={""}>Charger type* </label>
                            <select className={''} name={'chargerType'}
                                // value={formValue.chargerType}
                                    onChange={showInput}
                                    required={true}>
                                <option value={''}>-- Please select --</option>
                                <option value={'0'}>C TYPE</option>
                                <option value={'1'}>MICRO USB</option>
                            </select>

                            {/*<div className={'underline'}></div>*/}

                        </div>
                    </div>

                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label htmlFor={""}>Order number*</label>
                            <input type={'text'} name={'orderNumber'}
                                   value={editTablet.orderNumber}
                                   onChange={showInput}
                                   required={true}/>
                            <div className={'underline'}></div>
                        </div>
                        <div className={'input-data'}>
                            <label htmlFor={""}>Sim</label>
                            <input type={'number'} name={'simNumber'}
                                   value={editTablet.simNumber}
                                   onChange={showInput}
                                   required={false}/>
                            <div className={'underline'}></div>
                        </div>

                    </div>
                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label>Date of purchase*</label>
                            <input type={'date'} name={'dateOfPurchase'}
                                   value={editTablet.dateOfPurchase}
                                   onChange={showInput}
                                   required={true}/>
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
export default EditTablet;