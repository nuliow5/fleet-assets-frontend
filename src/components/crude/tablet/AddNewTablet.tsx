import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
var tabletLogo = require("../../../images/icons8-tablet-64.png");
const AddNewTablet = () => {

    const [tablet, setTablet] = useState(
        {
            model: "",
            imei: "",
            number: "",
            orderNumber: "",
            simNumber: "",
            // truckLicensePlate: "",
            dateOfPurchase: "",
            chargerType: ""
        }
    )

    const [message, setMessage] = useState();
    const navigate = useNavigate();

    function showInput(event: any) {
        const {name, value} = event.target;
        setTablet({...tablet, [name]: value})
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const allInputValue = {
            model: tablet.model,
            imei: tablet.imei,
            number: tablet.number,
            orderNumber: tablet.orderNumber,
            simNumber: tablet.simNumber,
            // truckLicensePlate: "",
            dateOfPurchase: tablet.dateOfPurchase,
            chargerType: tablet.chargerType
        };

        console.log(allInputValue);

        let res = await fetch('http://localhost:8082/assets/tablets',
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
                navigate('/assets/tablets');
            }, 20);

        } else {
            // setMessage(resJson.value("Some Error Occured"));
            setMessage(resJson.message);
        }


    }

    return (
        <div className={'container'}>
            <div className={'asset_component'}>

                <img src={tabletLogo}/>
                <p><h2>Add new tablet</h2></p>
                <p className="success_insert"> {message} </p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>

                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label htmlFor={""}>Model</label>
                            <input type={'text'} name={'model'}
                                   value={tablet.model}
                                   onChange={showInput}
                                   required={false}
                            />
                            <div className={'underline'}></div>

                        </div>

                        <div className={'input-data'}>
                            <label htmlFor={""}>Imei*</label>
                            <input type={'number'} name={'imei'}
                                   value={tablet.imei}
                                   onChange={showInput}
                                   required={true}/>
                            <div className={'underline'}></div>

                        </div>
                    </div>

                    <div className="form-row">
                        <div className={'input-data'}>
                            <label htmlFor={""}>Number*</label>
                            <input type={'text'} name={'number'}
                                   value={tablet.number}
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
                                   value={tablet.orderNumber}
                                   onChange={showInput}
                                   required={true}/>
                            <div className={'underline'}></div>
                        </div>
                        <div className={'input-data'}>
                            <label htmlFor={""}>Sim</label>
                            <input type={'number'} name={'simNumber'}
                                   value={tablet.simNumber}
                                   onChange={showInput}
                                   required={false}/>
                            <div className={'underline'}></div>
                        </div>

                    </div>
                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label>Date of purchase*</label>
                            <input type={'date'} name={'dateOfPurchase'}
                                   value={tablet.dateOfPurchase}
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
export default AddNewTablet;