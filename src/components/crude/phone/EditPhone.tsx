import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

const EditPhone = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const [editPhone, setEditPhone] = useState(
        {
            id: "",
            model: "",
            imei: "",
            number: "",
            orderNumber: "",
            dateOfPurchase: "",
            chargerType: "",
        });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const getPhone = async () => {
            const reqData = await fetch(`http://localhost:8082/assets/phones/${id}`);
            const resData = await reqData.json();
            setEditPhone(resData);
        }
        getPhone();
    }, [id]);

    const showInput = (e: any) => {
        setEditPhone({...editPhone, [e.target.name]: e.target.value});
    }

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        const editInputvalue = {
            id: editPhone.id,
            model: editPhone.model,
            imei: editPhone.imei,
            number: editPhone.number,
            orderNumber: editPhone.orderNumber,
            dateOfPurchase: editPhone.dateOfPurchase,
            chargerType: editPhone.chargerType

        };
        console.log(editInputvalue);
        let res = await fetch("http://localhost:8082/assets/phones", {
            method: "PUT",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(editInputvalue)
        });

        let resJson = await res.json();
        if (res.status === 200) {
            setMessage(resJson.success);
            setTimeout(() => {
                navigate('/assets/phones');
            }, 20);

        } else {
            setMessage(resJson.message);
        }

    }




    return(
        <>
            <div className={'container'}>
                <div className={'asset_component'}>
                    <p><h2>Edit phone [id:{id}] </h2></p>
                    <p className="success_insert"> {message} </p>
                </div>
                <div>
                    <form onSubmit={handleUpdate}>

                        <div className={'form-row'}>
                            <div className={'input-data'}>
                                <label htmlFor={""}>Model</label>
                                <input type={'text'} name={'model'}
                                       value={editPhone.model}
                                       onChange={showInput}
                                       required={false}
                                />
                                <div className={'underline'}></div>

                            </div>

                            <div className={'input-data'}>
                                <label htmlFor={""}>Imei*</label>
                                <input type={'number'} name={'imei'}
                                       value={editPhone.imei}
                                       onChange={showInput}
                                       required={true}/>
                                <div className={'underline'}></div>

                            </div>
                        </div>

                        <div className="form-row">
                            <div className={'input-data'}>
                                <label htmlFor={""}>Number*</label>
                                <input type={'text'} name={'number'}
                                       value={editPhone.number}
                                       onChange={showInput}
                                       required={true}/>
                                <div className={'underline'}></div>


                            </div>

                            <div className={'input-data'}>
                                <label htmlFor={""}>Charger type* </label>
                                <select className={''} name={'chargerType'}
                                    value={editPhone.chargerType}
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
                                       value={editPhone.orderNumber}
                                       onChange={showInput}
                                       required={true}/>
                                <div className={'underline'}></div>

                            </div>
                        </div>
                        <div className={'form-row'}>
                            <div className={'input-data'}>
                                <label>Date of purchase*</label>
                                <input type={'date'} name={'dateOfPurchase'}
                                       value={editPhone.dateOfPurchase}
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
        </>
    )
}

export default EditPhone;