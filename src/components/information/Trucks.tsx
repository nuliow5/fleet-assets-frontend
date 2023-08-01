import React, {useEffect, useState} from 'react';
import {getAllTrucks, getBalticTrucks, getEuTrucks} from "../../api/endPoints/TrucksEndpoints";
import {getAllSims, getBiteSims, getTele2Sims, getTeliaSims} from "../../api/endPoints/SimsEndpoints";
import {FormControl, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";

const Trucks = () => {
    const [loading, setLoading] = useState(true);

    const [filterValue, setFilterValue] = useState(0);

    const [search, setSearch] = useState('');

    const [trucks, setTrucks] = useState(
        [
            {
                id: "",
                licensePlate: "",
                model: "",
                isWork: "",
                workRegion: ""
            }
        ]
    )
    useEffect(() => {
        if (filterValue == 1) {
            getEuTrucks()
                .then(res => setTrucks(res.data))
                .finally(() => setLoading(false));
        } else if (filterValue == 2) {
            getBalticTrucks()
                .then(res => setTrucks(res.data))
                .finally(() => setLoading(false));
        } else if (filterValue == 0) {
            getAllTrucks()
                .then(res => setTrucks(res.data))
                .finally(() => setLoading(false))
        }

    }, [filterValue])

    // useEffect(() => {
    //     getAllTrucks()
    //         .then(res => setTrucks(res.data))
    //         .finally(() => setLoading(false))
    // }, [])

    return (
        <>
            <div className={'sub_header'}>
                <form className={'search_form'}>
                    <InputGroup className={'search_bar'}>
                        <FormControl placeholder={'Search by license plate'}
                                     onChange={(e: any) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </form>

                <Link to={"/trucks/add-new-truck"} className={"btn-warning"}>
                    {/*<i className={"fa fa-plus-square"} aria-hidden="true"></i>*/}
                    <p>+ Add truck</p>
                </Link>

                <div className={"dropdown"}>
                    <button className="dropbtn">
                        {/*<i className={"fa fa-filter"} aria-hidden="true"/>*/}
                        Filter
                    </button>

                    <div className="dropdown-content">
                        <a onClick={() => {
                            setFilterValue(1)
                        }}>Europe</a>

                        <a onClick={() => {
                            setFilterValue(2)
                        }}>Baltic</a>

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
                    <th scope="col">License Plate</th>
                    <th scope="col">Model</th>
                    <th scope="col">Is Work</th>
                    <th scope="col">Work region</th>
                    <th scope="col">Actions</th>

                </tr>
                </thead>

                <tbody id="trucks-table-body">
                {loading ? <div>kraunam</div>
                    : trucks
                        .filter(truck => {
                            return search === '' ? truck : truck.licensePlate.toLowerCase().includes(search);
                        }).map(truck => {
                                return (
                                    <tr>
                                        <td>{truck.id}</td>
                                        <td>{truck.licensePlate}</td>
                                        <td>{truck.model}</td>
                                        <td>{truck.isWork.toString()}</td>
                                        <td>{truck.workRegion}</td>
                                        <td className={'action-td'}>
                                            <Link to={'/trucks/edit-truck/' + truck.id} className={'btn-edit'}>
                                                <i className={"fa fa-pencil-square-o"}></i>
                                            </Link>
                                            <Link to={'/trucks/delete-truck/' + truck.id} className={'btn-delete'}>
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

export default Trucks;