import React, {useEffect, useState} from 'react';
import {getAllTrucks} from "../../api/TrucksEndpoints";

const Trucks = () => {
    const [loading, setLoading] = useState(true);

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
        getAllTrucks()
            .then(res => setTrucks(res.data))
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
                        .map(truck => {
                                return (
                                    <tr>
                                        <td>{truck.id}</td>
                                        <td>{truck.licensePlate}</td>
                                        <td>{truck.model}</td>
                                        <td>{truck.isWork.toString()}</td>
                                        <td>{truck.workRegion}</td>


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

export default Trucks;