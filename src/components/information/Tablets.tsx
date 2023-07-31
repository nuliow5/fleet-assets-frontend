import React, {useEffect, useState} from 'react';
import {getAllTablets, getTabletsWithCType, getTabletsWithMicroUsb} from "../../api/endPoints/TabletsEndpoints";
import {FormControl, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getAllPhones, getPhoneWithCType, getPhoneWithMicroUsb} from "../../api/endPoints/PhoneEndPoints";

const Tablets = () => {
    const [loading, setLoading] = useState(true);

    const [filterValue, setFilterValue] = useState(0);

    const [search, setSearch] = useState('');

    const [tablets, setTablets] = useState(
        [
            {
                id: "",
                model: "",
                imei: "",
                number: "",
                orderNumber: "",
                simNumber: "",
                truckLicensePlate: "",
                dateOfPurchase: "",
                chargerType: ""
            }
        ]
    )
    useEffect(() => {
        if (filterValue == 1) {
            getTabletsWithMicroUsb()
                .then(res => setTablets(res.data))
                .finally(() => setLoading(false));
        } else if (filterValue == 2) {
            getTabletsWithCType()
                .then(res => setTablets(res.data))
                .finally(() => setLoading(false));
        } else if (filterValue == 0) {
            getAllTablets()
                .then(res => setTablets(res.data))
                .finally(() => setLoading(false))
        }

    }, [filterValue])

    // useEffect( () => {
    //     getAllTablets()
    //         .then(res => setTablets(res.data))
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

                <Link to={"/assets/tablets/add-new-tablet"} className={"btn-warning"}>
                    <p>+ Add tablet</p>
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
                    <th scope="col">Model</th>
                    <th scope="col">Imei</th>
                    <th scope="col">Number</th>
                    <th scope="col">Order Nr</th>
                    <th scope="col">Sim</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Date of purchase</th>
                    <th scope="col">Charger type</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>

                <tbody id="sim-table-body">
                {loading ? <div>kraunam</div>
                    : tablets
                        .filter(tablet => {
                            return search === '' ? tablet : tablet.imei.includes(search);
                        })
                        .map(tablet => {
                                return (
                                    <tr>
                                        <td>{tablet.id}</td>
                                        <td>{tablet.model}</td>
                                        <td>{tablet.imei}</td>
                                        <td>{tablet.number}</td>
                                        <td>{tablet.orderNumber}</td>
                                        <td>{tablet.simNumber}</td>
                                        <td>{tablet.truckLicensePlate}</td>
                                        <td>{tablet.dateOfPurchase}</td>
                                        <td>{tablet.chargerType}</td>
                                        <td className={'action-td'}>
                                            <Link to={'/assets/tablets/edit-tablet/' + tablet.id} className={'btn-edit'}>
                                                <i className={"fa fa-pencil-square-o"}></i>
                                            </Link>
                                            <Link to={'/assets/tablets/delete-tablet/' + tablet.id} className={'btn-delete'}>
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

export default Tablets;