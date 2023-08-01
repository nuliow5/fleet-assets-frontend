import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Switch} from "antd";

var truckLogo = require("../../../images/icons8-truck-64.png")

const AddNewTruck = () => {
    const [formValue, setFormValues] = useState(
        {
            licensePlate: '',
            model: '',
            isWork: '',
            workRegion: ''
        })

    // const [toggle, setToggle] = useState(false);

    // const toggler = () => {
    //     toggle ? setToggle(false) : setToggle(true);
    // }

    const onChange = (checked: any) => {
        // console.log(`${checked}`);
        let updatedForm = formValue;
        updatedForm.isWork = checked;
        setFormValues(updatedForm);
    };

    const [message, setMessage] = useState();
    const navigate = useNavigate();

    function showInput(event: any) {
        // setFormValues(event.target.value);
        const {name, value} = event.target;
        setFormValues({...formValue, [name]: value})
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const allInputValue = {
            licensePlate: formValue.licensePlate,
            model: formValue.model,
            isWork: formValue.isWork,
            workRegion: formValue.workRegion
        };

        console.log(allInputValue);

        let res = await fetch('http://localhost:8082/trucks',
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
                navigate('/trucks');
            }, 20);

        } else {
            // setMessage(resJson.value("Some Error Occured"));
            setMessage(resJson.message);
        }
    }

    return (
        <div className={'container'}>
            <div className={'asset_component'}>
                <img src={truckLogo}/>
                <p><h2>Add new truck</h2></p>
                <p className="success_insert"> {message} </p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>

                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label htmlFor={""}>License plate*</label>
                            <input type={'text'} name={'licensePlate'}
                                   value={formValue.licensePlate}
                                   onChange={showInput}
                                   required={true}
                            />
                            <div className={'underline'}></div>

                        </div>

                        <div className={'input-data'}>
                            <label htmlFor={""}>Model</label>
                            <input type={'text'} name={'model'}
                                   value={formValue.model}
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
                                    value={formValue.workRegion}
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

export default AddNewTruck;