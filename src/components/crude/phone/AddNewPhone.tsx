import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
var  phoneLogo = require("../../../images/icons8-phone-80.jpg");


const AddNewPhone = () => {
    const [formValue, setFormValues] = useState(
        {
            model: '',
            imei: '',
            number: '',
            orderNumber: '',
            dateOfPurchase: '',
            chargerType: ''
            // truckId: '',
            // truckLicensePlate: ''
        })

    const [message, setMessage] = useState();
    const navigate = useNavigate();

    function showInput(event: any) {
        const {name, value} = event.target;
        setFormValues({...formValue, [name]: value})
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const allInputValue = {
            model: formValue.model,
            imei: formValue.imei,
            number: formValue.number,
            orderNumber: formValue.orderNumber,
            dateOfPurchase: formValue.dateOfPurchase,
            chargerType: formValue.chargerType
            // truckId: '',
            // truckLicensePlate: ''
        };

        console.log(allInputValue);

        let res = await fetch('http://localhost:8082/assets/phones',
            {
                method: "POST",
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(allInputValue)
            });

        let resJson = await res.json();
        if (res.status === 200) {
            // setMessage(resJson.success);
            setMessage(resJson.message);
            setTimeout(() => {
                navigate('/assets/phones');
            }, 20);

        }
        else {
            // setMessage(resJson.value("Some Error Occured"));
            setMessage(resJson.message);
        }


    }



    return (
        <div className={'container'}>
            <div className={'asset_component'}>

                <img src={phoneLogo}/>
                <p><h2>Add new phone</h2></p>
                <p className="success_insert"> {message} </p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>

                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label htmlFor={""}>Model</label>
                            <input type={'text'} name={'model'}
                                   value={formValue.model}
                                   onChange={showInput}
                                   required={false}
                            />
                            <div className={'underline'}></div>

                        </div>

                        <div className={'input-data'}>
                            <label htmlFor={""}>Imei*</label>
                            <input type={'number'} name={'imei'}
                                   value={formValue.imei}
                                   onChange={showInput}
                                   required={true}/>
                            <div className={'underline'}></div>

                        </div>
                    </div>

                    <div className="form-row">
                        <div className={'input-data'}>
                            <label htmlFor={""}>Number*</label>
                            <input type={'text'} name={'number'}
                                   value={formValue.number}
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
                                   value={formValue.orderNumber}
                                   onChange={showInput}
                                   required={true}/>
                            <div className={'underline'}></div>

                        </div>
                    </div>
                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label>Date of purchase*</label>
                            <input type={'date'} name={'dateOfPurchase'}
                                   value={formValue.dateOfPurchase}
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

export default AddNewPhone;