import React, {useEffect, useState} from 'react';
import {getAllPhones} from "../../api/PhoneEndPoints";
import {Link} from "react-router-dom";

const Phones = () => {
    const [loading, setLoading] = useState(true);

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
        getAllPhones()
            .then(res => setPhones(res.data))
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <div className={'sub_header'}>
                {/*| + new asset | filter |*/}
                <Link to={""} className={"btn-warning"}>
                    <i className={"fa fa-plus-square"} aria-hidden="true"></i>
                </Link>

                <div className={"btn-warning"}>
                    <i className={"fa fa-filter"} aria-hidden="true"></i>
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