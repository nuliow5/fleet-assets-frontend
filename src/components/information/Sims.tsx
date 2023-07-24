import React, {useEffect, useState} from 'react';
import {getAllSims} from "../../api/SimsEndpoints";
import {getAllTrucks} from "../../api/TrucksEndpoints";
import {Link} from "react-router-dom";

const Sims = () => {
    const [loading, setLoading] = useState(true);

    const [sims, setSims] = useState(
        [
            {
                id: "",
                truckId: "",
                truckLicensePlate: "",
                iccid: "",
                number: "",
                pin: "",
                operator: "",
                plan: "",
                ip: "",
                activate: "",
                deActivate: ""
            }
        ]
    )


    useEffect(() => {
        getAllSims()
            .then(res => setSims(res.data))
            .finally(() => setLoading(false))
    }, [])




    return (
        <>
            <div className={'sub_header'}>
                {/*| + new asset | filter |*/}
                <Link to={"/assets/sims/add-new-sim"} className={"btn-warning"}>Add new sim</Link>
                <div className={"btn-warning"}>Filter</div>
            </div>



            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Owner</th>
                    <th scope="col">IccId</th>
                    <th scope="col">Number</th>
                    <th scope="col">Operator</th>
                    <th scope="col">Plan</th>
                    <th scope="col">Pin</th>
                    <th scope="col">Ip</th>
                    <th scope="col">Activate date</th>
                    <th scope="col">Deactivate date</th>
                    <th scope="col">Actions</th>

                </tr>
                </thead>

                <tbody id="sim-table-body">
                {loading ? <div>kraunam</div>
                    : sims
                        .map(sim => {
                                return (
                                    <tr>
                                        <td>{sim.id}</td>
                                        <td>{sim.truckLicensePlate}</td>
                                        <td>{sim.iccid}</td>
                                        <td>{sim.number}</td>
                                        <td>{sim.operator}</td>
                                        <td>{sim.plan}</td>
                                        <td>{sim.pin}</td>
                                        <td>{sim.ip}</td>
                                        <td>{sim.activate}</td>
                                        <td>{sim.deActivate}</td>
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

export default Sims;