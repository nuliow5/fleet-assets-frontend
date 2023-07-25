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
            // operator: '',
            plan: '',
            ip: '',
            activate: ''
        });

    const [message, setMessage]= useState('');

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
            // operator: editSim.operator,
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

        let resjson = await res.json();
        if (res.status === 200) {
            setMessage(resjson.success);
            setTimeout(() => {
                navigate('/assets/sims');
            }, 2000);

        }
        else {
            setMessage("Some error Occured");
        }

    }

    return (
        <>
            <div>
                Edit sim {id}
            </div>

            <form onSubmit={handleUpdate}>

                <div className={'form-row'}>
                    <div className={'input-data1'}>
                        <input type={'text'} name={'iccid'}
                               value={editSim.iccid}
                               onChange={showInput}
                               required={false}
                        />
                        <div className={'underline'}></div>
                        <label htmlFor={""}>IccId*</label>
                    </div>

                    <div className={'input-data1'}>
                        <input type={'text'} name={'number'}
                               value={editSim.number}
                               onChange={showInput}
                               required={false}/>
                        <div className={'underline'}></div>
                        <label htmlFor={""}>Number*</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className={'input-data1'}>
                        <input type={'text'} name={'pin'}
                               value={editSim.pin}
                               onChange={showInput}
                               required={false}/>
                        <div className={'underline'}></div>
                        <label htmlFor={""}>Pin</label>

                    </div>

                    {/*<div className={'select-data1'}>*/}
                    {/*    <label htmlFor={""}>Operator* </label>*/}
                    {/*    <select className={''} name={'operator'}*/}
                    {/*            value={editSim.operator}*/}
                    {/*            onChange={showInput}*/}
                    {/*            required={true}>*/}
                    {/*        <option value={''}>-- Please select --</option>*/}
                    {/*        <option value={'0'}>TELIA</option>*/}
                    {/*        <option value={'1'}>BITE</option>*/}
                    {/*        <option value={'2'}>TELE2</option>*/}
                    {/*    </select>*/}
                    {/*    /!*<div className={'underline'}></div>*!/*/}

                    {/*</div>*/}
                </div>

                <div className={'form-row'}>
                    <div className={'input-data1'}>
                        <input type={'text'} name={'plan'}
                               value={editSim.plan}
                               onChange={showInput}
                               required={false}/>
                        <div className={'underline'}></div>
                        <label htmlFor={""}>Plan*</label>
                    </div>
                    <div className={'input-dat1'}>
                        <input type={'text'} name={'ip'}
                               value={editSim.ip}
                               onChange={showInput}
                               required={false}/>
                        <div className={'underline'}></div>
                        <label htmlFor={""}>Ip</label>
                    </div>
                </div>
                <div className={'form-row'}>
                    <div className={'input-data1'}>
                        <input type={'date'} name={'activate'}
                               value={editSim.activate}
                               onChange={showInput}
                               required={false}/>
                        <div className={'underline'}></div>
                        <label>Activate</label>

                    </div>

                    <div className={'input-data1'}>

                        <label htmlFor={""}></label>
                        <button type={'submit'} className={'btn btn-success btn-lg'}>Submit</button>

                    </div>
                </div>


            </form>
        </>
    )
}

export default EditSim;