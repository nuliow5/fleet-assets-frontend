import React, {useEffect, useState} from 'react';
import {getAllSims, getBiteSims, getTele2Sims, getTeliaSims} from "../../api/endPoints/SimsEndpoints";
import {Link} from "react-router-dom";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";

const Sims = () => {
    const [loading, setLoading] = useState(true);

    const [filterValue, setFilterValue] = useState(0);

    const [search, setSearch] = useState('');

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
        if (filterValue == 1) {
            getTeliaSims()
                .then(res => setSims(res.data))
                .finally(() => setLoading(false));
        } else if (filterValue == 2) {
            getBiteSims()
                .then(res => setSims(res.data))
                .finally(() => setLoading(false));
        } else if (filterValue == 3) {
            getTele2Sims()
                .then(res => setSims(res.data))
                .finally(() => setLoading(false));
        } else if (filterValue == 0) {
            getAllSims()
                .then(res => setSims(res.data))
                .finally(() => setLoading(false))
        }

    }, [filterValue])


    return (
        <>
            <div className={'sub_header'}>
                <form className={'search_form'}>
                    <InputGroup className={'search_bar'}>
                        <FormControl placeholder={'Search by iccid'}
                                     onChange={(e: any) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </form>

                <Link to={"/assets/sims/add-new-sim"} className={"btn-warning"}>
                    {/*<i className={"fa fa-plus-square"} aria-hidden="true"></i>*/}
                    <p>+ Add sim</p>
                </Link>

                <div className={"dropdown"}>
                    <button className="dropbtn">
                        {/*<i className={"fa fa-filter"} aria-hidden="true"/>*/}
                        Filter
                    </button>

                    <div className="dropdown-content">
                        <a onClick={() => {
                            setFilterValue(1)
                        }}>Telia</a>

                        <a onClick={() => {
                            setFilterValue(2)
                        }}>Bite</a>

                        <a onClick={() => {
                            setFilterValue(3)
                        }}>Tele2</a>

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
                        .filter(sim => {
                            return search === '' ? sim : sim.iccid.includes(search);
                        }).map(sim => {
                                return (
                                    <tr key={sim.id}>
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
                                        <td className={'action-td'}>
                                            <Link to={'/assets/sims/edit-sim/' + sim.id} className={'btn-edit'}>
                                                <i className={"fa fa-pencil-square-o"}></i>
                                            </Link>
                                            <Link to={'/assets/sims/delete-sim/' + sim.id} className={'btn-delete'}>
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

export default Sims;