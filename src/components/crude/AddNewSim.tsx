import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";


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
    const navigate= useNavigate();

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
                headers:{'content-type' : 'application/json'},
                body:JSON.stringify(allInputValue)
            });

        let resJson = await res.json();
        if(res.status===200) {
            setMessage(resJson.success);
            setTimeout(() => {
                navigate('/assets/sims');
            }, 2000);

            // } else{
            //     setMessage(resJson.value("Some Error Occured"));
            // }
        }

    }

    return (
        <div>
            add new sim
            <p className="text-success"> { message } </p>
            <form onSubmit={handleSubmit}>

                <div className={'row'}>
                    <div className={''}>
                        <div className={''}>
                            <label className={''}>IccId</label>
                            <input type={'text'} name={'iccid'} className={'form-control'}
                                   value={formValue.iccid}
                                   onChange={showInput}
                            />
                        </div>
                    </div>

                    <div className={''}>
                        <div className={''}>
                            <label className={''}>Number</label>
                            <input type={'text'} name={'number'} className={'form-control'}
                                   value={formValue.number}
                                   onChange={showInput}/>
                        </div>
                    </div>

                    <div className={''}>
                        <div className={''}>
                            <label className={''}>Pin</label>
                            <input type={'text'} name={'pin'} className={'form-control'}
                                   value={formValue.pin}
                                   onChange={showInput}/>
                        </div>
                    </div>

                    <div className={''}>
                        <div className={''}>
                            <label className={''}>Operator</label>
                            <select className={''} name={'operator'}
                                    value={formValue.operator}
                                    onChange={showInput}>
                                <option value={''}>-- Please select --</option>
                                <option value={'0'}>TELIA</option>
                                <option value={'1'}>BITE</option>
                                <option value={'2'}>TELE2</option>
                            </select>
                        </div>
                    </div>

                    <div className={''}>
                        <div className={''}>
                            <label className={''}>Plan</label>
                            <input type={'text'} name={'plan'} className={'form-control'}
                                   value={formValue.plan}
                                   onChange={showInput}/>
                        </div>
                    </div>

                    <div className={''}>
                        <div className={''}>
                            <label className={''}>Ip</label>
                            <input type={'text'} name={'ip'} className={'form-control'}
                                   value={formValue.ip}
                                   onChange={showInput}/>
                        </div>
                    </div>

                    <div className={''}>
                        <div className={''}>
                            <label className={''}>Activate</label>
                            <input type={'text'} name={'activate'} className={'form-control'}
                                   value={formValue.activate}
                                   onChange={showInput}/>
                        </div>
                    </div>

                    <div className={''}>
                        <div className={''}>
                            <label className={''}></label>
                            <button type={'submit'} className={'btn btn-success btn-lg'}>Submit</button>
                        </div>
                    </div>

                </div>

            </form>
        </div>
    );
};

export default AddNewSim;