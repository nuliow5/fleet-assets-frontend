import React, {useEffect, useState} from 'react';
import {getAllTablets} from "../../api/TabletsEndpoints";

const Tablets = () => {
    const [loading, setLoading] = useState(true);

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

    useEffect( () => {
        getAllTablets()
            .then(res => setTablets(res.data))
            .finally(() => setLoading(false))
    }, [])



    return (
        <>
            <div className={'sub_header'}>
                | + new asset | filter |
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
                                        <td>edit | delete</td>
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