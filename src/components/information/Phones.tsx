import React, {useEffect, useState} from 'react';
import {getAllPhones, getPhoneWithCType, getPhoneWithMicroUsb} from "../../api/endPoints/PhoneEndPoints";
import {Link} from "react-router-dom";
import {FormControl, InputGroup} from "react-bootstrap";
import {getAllSims, getBiteSims, getTele2Sims, getTeliaSims} from "../../api/endPoints/SimsEndpoints";

const Phones = () => {
    const [loading, setLoading] = useState(true);

    const [filterValue, setFilterValue] = useState(0);

    const [search, setSearch] = useState('');

    const [phones, setPhones] = useState(
        [
            {
                id: "",
                model: "",
                imei: "",
                number: "",
                orderNumber: "",
                dateOfPurchase: "",
                chargerType: "",
                truckId: "",
                truckLicensePlate: ""
            }
        ]
    )

    useEffect(() => {
        if (filterValue == 1) {
            getPhoneWithMicroUsb()
                .then(res => setPhones(res.data))
                .finally(() => setLoading(false));
        } else if (filterValue == 2) {
            getPhoneWithCType()
                .then(res => setPhones(res.data))
                .finally(() => setLoading(false));
        } else if (filterValue == 0) {
            getAllPhones()
                .then(res => setPhones(res.data))
                .finally(() => setLoading(false))
        }

    }, [filterValue])


    // useEffect(() => {
    //     getAllPhones()
    //         .then(res => setPhones(res.data))
    //         .finally(() => setLoading(false))
    // }, [])

    return (
        <>
            <div className={'sub_header'}>
                <form className={'search_form'}>
                    <InputGroup className={'search_bar'}>
                        <FormControl placeholder={'Search by imei'}
                                     onChange={(e: any) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </form>

                <Link to={"/assets/phones/add-new-phone"} className={"btn-warning"}>
                    {/*<i className={"fa fa-plus-square"} aria-hidden="true"></i>*/}
                    <p>+ Add phone</p>
                </Link>

                <div className={"dropdown"}>
                    <button className="dropbtn">
                        {/*<i className={"fa fa-filter"} aria-hidden="true"/>*/}
                        Filter
                    </button>

                    <div className="dropdown-content">
                        <a onClick={() => {
                            setFilterValue(1)
                        }}>MICRO USB</a>

                        <a onClick={() => {
                            setFilterValue(2)
                        }}>C TYPE</a>

                        <a onClick={() => {
                            setFilterValue(0)
                        }}>Clear filter</a>
                    </div>

                </div>

            </div>

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Model</th>
                    <th scope="col">Imei</th>
                    <th scope="col">Number</th>
                    <th scope="col">Order number</th>
                    <th scope="col">Date of purchase</th>
                    <th scope="col">Charger type</th>
                    <th scope="col">Actions</th>

                </tr>
                </thead>

                <tbody id="phone-table-body">
                {loading ? <div>kraunam</div>
                    : phones
                        .filter(phone => {
                            return search === '' ? phone : phone.imei.includes(search);
                        })
                        .map(phone => {
                                return (
                                    <tr>
                                        <td>{phone.id}</td>
                                        <td>{phone.truckLicensePlate}</td>
                                        <td>{phone.model}</td>
                                        <td>{phone.imei}</td>
                                        <td>{phone.number}</td>
                                        <td>{phone.orderNumber}</td>
                                        <td>{phone.dateOfPurchase}</td>
                                        <td>{phone.chargerType}</td>
                                        <td className={'action-td'}>
                                            <Link to={'/assets/phones/edit-phone/' + phone.id} className={'btn-edit'}>
                                                <i className={"fa fa-pencil-square-o"}></i>
                                            </Link>
                                            <Link to={'/assets/phones/delete-phone/' + phone.id} className={'btn-delete'}>
                                                <i className={"fa fa-times-circle"}></i>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                }

                </tbody>
            </table>
        </>
    );
};

export default Phones;