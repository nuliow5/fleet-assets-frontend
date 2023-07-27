import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
// import {simImage} from "../../images/sim.png";

const AddNewSim = () => {
    const [formValue, setFormValues] = useState(
        {
            iccid: '',
            number: '',
            pin: "",
            operator: '',
            plan: '',
            ip: '',
            activate: ''
        })

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
            iccid: formValue.iccid,
            number: formValue.number,
            pin: formValue.pin,
            operator: formValue.operator,
            plan: formValue.plan,
            ip: formValue.ip,
            activate: formValue.activate
        };

        console.log(allInputValue);

        let res = await fetch('http://localhost:8082/assets/sims',
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
                navigate('/assets/sims');
            }, 20);

        }
        else {
            // setMessage(resJson.value("Some Error Occured"));
            setMessage(resJson.message);
        }


    }

    return (
        <div className={'container'}>
            <div>
                <p><h2>Add new sim</h2></p>
                <p className="success_insert"> {message} </p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>

                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label htmlFor={""}>IccId*</label>
                            <input type={'number'} name={'iccid'}
                                   value={formValue.iccid}
                                   onChange={showInput}
                                   required={true}
                            />
                            <div className={'underline'}></div>

                        </div>

                        <div className={'input-data'}>
                            <label htmlFor={""}>Number*</label>
                            <input type={'number'} name={'number'}
                                   value={formValue.number}
                                   onChange={showInput}
                                   required={true}/>
                            <div className={'underline'}></div>

                        </div>
                    </div>

                    <div className="form-row">
                        <div className={'input-data'}>
                            <label htmlFor={""}>Pin</label>
                            <input type={'number'} name={'pin'}
                                   value={formValue.pin}
                                   onChange={showInput}
                                   required={false}/>
                            <div className={'underline'}></div>


                        </div>

                        <div className={'input-data'}>
                            <label htmlFor={""}>Operator* </label>
                            <select className={''} name={'operator'}
                                    value={formValue.operator}
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
                                   value={formValue.plan}
                                   onChange={showInput}
                                   required={true}/>
                            <div className={'underline'}></div>

                        </div>
                        <div className={'input-data'}>
                            <label htmlFor={""}>Ip</label>
                            <input type={'text'} name={'ip'}
                                   value={formValue.ip}
                                   onChange={showInput}
                                   required={false}/>
                            <div className={'underline'}></div>

                        </div>
                    </div>
                    <div className={'form-row'}>
                        <div className={'input-data'}>
                            <label>Activate*</label>
                            <input type={'date'} name={'activate'}
                                   value={formValue.activate}
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
    );
};

export default AddNewSim;