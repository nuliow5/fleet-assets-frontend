// const API = "http://localhost:8082/assets/sims";
//
// const getSims = async () => {
//     const params = new URLSearchParams(window.location.search);
//     let getUsersURL = new URL(API);
//     getUsersURL.searchParams.set("pageNumber", params.get("pageNumber"));
//     getUsersURL.searchParams.set("pageSize", params.get("pageSize"));
//
//     const sims = await fetch(getUsersURL);
//     return sims.json();
// };
//
// const renderSimsTable = async (sims) => {
//     const tableBody = document.getElementById("sim-table-body");
//     sims.forEach((s) => {
//         const tr = document.createElement("tr");
//         for (const key in s) {
//             const td = document.createElement("td");
//             td.innerText = s[key];
//             tr.appendChild(td);
//         }
//         tableBody.appendChild(tr);
//     });
// };
//
// (async () => {
//     //   const statistics = await getStatistics();
//     //   renderStatisticsTable(statistics);
//     const sims = await getSims();
//     renderSimsTable(sims);
// })();
//
