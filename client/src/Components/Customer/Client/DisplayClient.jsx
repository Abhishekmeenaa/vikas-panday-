// // // import React, { useEffect } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Table, Button, Spinner } from "react-bootstrap";
// // // import {
// // //   deleteAddClientForm,
// // //   getAllFullClients,
// // //   updateClientLeadStatus,
// // // } from "../../../redux/feature/ClientRedux/ClientThunx";
// // // import { Link, useNavigate } from "react-router-dom";


// // // function DisplayClient({ setActiveTab, setEditId }) {
// // //   const dispatch = useDispatch();
// // //   const { clients, loading, error } = useSelector((state) => state.client);

  
// // //   useEffect(() => {
// // //     dispatch(getAllFullClients());
// // //   }, [dispatch]);

// // //   const handleDelete = (id) => {
// // //     if (window.confirm("Are you sure you want to delete this client?")) {
// // //       dispatch(deleteAddClientForm(id));
// // //     }
// // //   };
// // //   const handleEdit = (id) => {
// // //     setEditId(id);
// // //     setActiveTab("add");
// // //   };

// // //   const navigate = useNavigate();


// // //   // const handleConvert = (id) => {
// // //   //   // Implement your convert logic here
// // //   //   console.log("Convert client with ID:", id);
// // //   // };

// // //   const handleView = (id) => {
// // //   navigate(`/customer-detail/${id}`);
// // //   // navigate("/customer-detail", { state: { client } });
// // // };


// // //   if (loading)
// // //     return (
// // //       <div className="text-center mt-4">
// // //         <Spinner animation="border" />
// // //       </div>
// // //     );
// // //   if (error) return <p className="text-danger">{error}</p>;
// // //   const handleConvertStatus = (id, status) => {
// // //     dispatch(updateClientLeadStatus({ id, status }))
// // //       .unwrap()
// // //       .then(() => dispatch(getAllFullClients()));
// // //   };

// // //   return (
// // //     <div className="container mt-4">
// // //       <h3>Client List</h3>
// // //       <Table striped bordered hover responsive>
// // //         <thead className="table-light">
// // //           <tr>
// // //             <th>#</th>
// // //             <th>Name</th>
// // //             <th>Contact No</th>
// // //             <th>Email</th>
// // //             <th>Address</th>
// // //             <th>City</th>
// // //             {/* <th>Group</th> */}
// // //             <th>Actions</th>
// // //             <th>Convert</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {clients.map((client, index) => {
// // //             const personal = client.personalDetails || {};
// // //             const contact = client.contactInfo || {};

// // //             const name = `${personal.salutation || ""} ${
// // //               personal.familyHead || personal.name || ""
// // //             }`.trim();
// // //             const mobile = personal.contactNo || contact.mobileNo || "";
// // //             const email = contact.emailId || personal.email || "";
// // //             const address =
// // //               personal.preferredMeetingAddr ||
// // //               personal.resiAddr ||
// // //               personal.officeAddr ||
// // //               "-";
// // //             const city = personal.city || "-";
// // //             // const group = personal.group || "-";

// // //             return (
// // //               <tr key={client._id}>
// // //                 <td>{index + 1}</td>
// // //                 <td>{name}</td>
// // //                 <td>{mobile}</td>
// // //                 <td>{email}</td>
// // //                 <td>{address}</td>
// // //                 <td>{city}</td>
// // //                 {/* <td>{group}</td> */}
// // //                 <td   >
// // //                   <Button
// // //                     variant="warning"
// // //                     size="sm"
// // //                     className="me-2"
// // //                     onClick={() => handleEdit(client._id)}
// // //                   >
// // //                     Edit
// // //                   </Button>
// // //                   <Button
// // //                     variant="danger"
// // //                     size="sm"
// // //                     onClick={() => handleDelete(client._id)}
// // //                     className="me-2"
// // //                   >
// // //                     Delete
// // //                   </Button>
// // //                   <Button
// // //   variant="success"
// // //   size="sm"
// // //   onClick={() => handleView(client._id)}
// // // >
// // //   View
// // // </Button>
                 
               
// // //                 </td>
// // //                 <td> 
// // //                   <Button
// // //                     variant="success"
// // //                     size="sm"
// // //                     onClick={() => handleConvertStatus(client._id, "prospect")}
// // //                   >
// // //                     To Prospect
// // //                   </Button>
// // //                 </td>
// // //               </tr>
// // //             );
// // //           })}
// // //         </tbody>
// // //       </Table>
// // //     </div>
// // //   );
// // // }

// // // export default DisplayClient;

// // import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Button, Spinner } from "react-bootstrap";
// // import DataTable from "react-data-table-component";
// // import {
// //   deleteAddClientForm,
// //   getAllFullClients,
// //   updateClientLeadStatus,
// // } from "../../../redux/feature/ClientRedux/ClientThunx";
// // import { useNavigate } from "react-router-dom";

// // function DisplayClient({ setActiveTab, setEditId }) {
// //   const dispatch = useDispatch();
// //   const { clients, loading, error } = useSelector((state) => state.client);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     dispatch(getAllFullClients());
// //   }, [dispatch]);

// //   const handleDelete = (id) => {
// //     if (window.confirm("Are you sure you want to delete this client?")) {
// //       dispatch(deleteAddClientForm(id));
// //     }
// //   };

// //   const handleEdit = (id) => {
// //     setEditId(id);
// //     setActiveTab("add");
// //   };

// //   const handleView = (id) => {
// //     navigate(`/customer-detail/${id}`);
// //   };

// //   const handleConvertStatus = (id, status) => {
// //     dispatch(updateClientLeadStatus({ id, status }))
// //       .unwrap()
// //       .then(() => dispatch(getAllFullClients()));
// //   };

// //   const columns = [

    
// //     {
// //       name: "#",
// //       selector: (row, index) => index + 1,
// //       sortable: true,
// //       width: "60px",
// //     },
// //      {
// //       name: "Group Code",
// //       selector: (row) => row.group,
// //       sortable: true,
// //     },
// //      {
// //       name: "Pa Name",
// //       selector: (row) => row.paName,
// //       sortable: true,
// //     },
// //     {
// //       name: "Name",
// //       selector: (row) => row.name,
// //       sortable: true,
// //     },
// //     {
// //       name: "Contact No",
// //       selector: (row) => row.mobile,
// //       sortable: true,
// //     },
// //     {
// //       name: "Email",
// //       selector: (row) => row.email,
// //       sortable: true,
// //     },
// //     {
// //       name: "Address",
// //       selector: (row) => row.address,
// //       sortable: true,
// //     },
// //     {
// //       name: "City",
// //       selector: (row) => row.city,
// //       sortable: true,
// //     },
// //     {
// //       name: "Actions",
// //       cell: (row) => (
// //         <div>
// //           <Button c
// //             variant="warning"
// //             size="sm"
// //             className="me-2 flex-column"
// //             onClick={() => handleEdit(row.id)}
// //           >
// //             Edit
// //           </Button>
// //           <Button
// //             variant="danger"
// //             size="sm"
// //             onClick={() => handleDelete(row.id)}
// //             className="me-2"
// //           >
// //             Delete
// //           </Button>
// //           <Button
// //             variant="success"
// //             size="sm"
// //             onClick={() => handleView(row.id)}
// //           >
// //             View
// //           </Button>
// //         </div>
// //       ),
// //       ignoreRowClick: true,
// //       allowOverflow: true,
// //       button: true,
// //     },
// //     {
// //       name: "Convert",
// //       cell: (row) => (
// //         <Button
// //           variant="success"
// //           size="sm"
// //           onClick={() => handleConvertStatus(row.id, "prospect")}
// //         >
// //           To Prospect
// //         </Button>
// //       ),
// //       ignoreRowClick: true,
// //       allowOverflow: true,
// //       button: true,
// //     },
// //   ];

// //   const data = clients.map((client) => {
// //     console.log("ha",client);
    
// //     const personal = client.personalDetails || {};
// //     const contact = client.contactInfo || {};

// //     return {
// //       id: client._id,
// //       name: `${personal.salutation || ""} ${
// //         personal.familyHead || personal.name || ""
// //       }`.trim(),
// //       mobile: personal.contactNo || contact.mobileNo || "",
// //       email: contact.emailId || personal.email ||  contact.paName || ""   ,
// //       address:
// //         personal.preferredMeetingAddr ||
// //         personal.resiAddr ||
// //         personal.officeAddr ||
// //         "-",
// //       city: personal.city || "-",
// //     };
// //   });

// //   if (loading)
// //     return (
// //       <div className="text-center mt-4">
// //         <Spinner animation="border" />
// //       </div>
// //     );
    
// //   if (error) return <p className="text-danger">{error}</p>;

// //   return (
// //     <div className="container mt-4 flex">
// //       <h3>Client List</h3>
// //       <DataTable
// //         columns={columns}
// //         data={data}
// //         pagination
// //         highlightOnHover
// //         responsive
// //         striped
// //         bordered
// //         progressPending={loading}
// //         progressComponent={<Spinner animation="border" />}
// //       />
// //     </div>
// //   );
// // }

// // export default DisplayClient;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button, Spinner } from "react-bootstrap";
// import DataTable from "react-data-table-component";
// import {
//   deleteAddClientForm,
//   getAllFullClients,
//   updateClientLeadStatus,
// } from "../../../redux/feature/ClientRedux/ClientThunx";
// import { useNavigate } from "react-router-dom";

// function DisplayClient({ setActiveTab, setEditId }) {
//   const dispatch = useDispatch();
//   const { clients, loading, error } = useSelector((state) => state.client);
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(getAllFullClients());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this client?")) {
//       dispatch(deleteAddClientForm(id));
//     }
//   };

//   const handleEdit = (id) => {
//     setEditId(id);
//     setActiveTab("add");
//   };

//   const handleView = (id) => {
//     navigate(`/customer-detail/${id}`);
//   };

//   const handleConvertStatus = (id, status) => {
//     dispatch(updateClientLeadStatus({ id, status }))
//       .unwrap()
//       .then(() => dispatch(getAllFullClients()));
//   };

//   const columns = [
//     {
//       name: "#",
//       selector: (row, index) => index + 1,
//       sortable: true,
//       width: "60px",
//     },
//     {
//       name: "Group Code",
//       selector: (row) => row.group || "-",
//       sortable: true,
//     },
//     {
//       name: "PA Name",
//       selector: (row) => row.paName || "-",
//       sortable: true,
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Contact No",
//       selector: (row) => row.mobile,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//       sortable: true,
//     },
//     {
//       name: "Address",
//       selector: (row) => row.address,
//       sortable: true,
//     },
//     {
//       name: "City",
//       selector: (row) => row.city,
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="d-flex flex-wrap gap-1">
//           <Button
//             variant="warning"
//             size="sm"
//             onClick={() => handleEdit(row.id)}
//             className="text-nowrap"
//           >
//             Edit
//           </Button>
//           <Button
//             variant="danger"
//             size="sm"
//             onClick={() => handleDelete(row.id)}
//             className="text-nowrap"
//           >
//             Delete
//           </Button>
//           <Button
//             variant="success"
//             size="sm"
//             onClick={() => handleView(row.id)}
//             className="text-nowrap"
//           >
//             View
//           </Button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//       width: "220px",
//     },
//     {
//       name: "Convert",
//       cell: (row) => (
//         <Button
//           variant="primary"
//           size="sm"
//           onClick={() => handleConvertStatus(row.id, "prospect")}
//           className="text-nowrap"
//         >
//           To Prospect
//         </Button>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//       width: "120px",
//     },
//   ];

//   const data = clients.map((client) => {
//     const personal = client.personalDetails || {};
//     const contact = client.contactInfo || {};

//     return {
//       id: client._id,
//       group: personal.group || "-",
//       paName: contact.paName || "-",
//       name: `${personal.salutation || ""} ${
//         personal.familyHead || personal.name || ""
//       }`.trim(),
//       mobile: personal.contactNo || contact.mobileNo || "",
//       email: contact.emailId || personal.email || "",
//       address:
//         personal.preferredMeetingAddr ||
//         personal.resiAddr ||
//         personal.officeAddr ||
//         "-",
//       city: personal.city || "-",
//     };
//   });

//   if (loading)
//     return (
//       <div className="text-center mt-4">
//         <Spinner animation="border" />
//       </div>
//     );
    
//   if (error) return <p className="text-danger">{error}</p>;

//   return (
//     <div className="container mt-4">
//       <h3>Client List</h3>
//       <div className="card shadow-sm">
//         <DataTable
//           columns={columns}
//           data={data}
//           pagination
//           highlightOnHover
//           responsive
//           striped
//           bordered
//           fixedHeader
//           fixedHeaderScrollHeight="600px"
//           progressPending={loading}
//           progressComponent={
//             <div className="py-5">
//               <Spinner animation="border" />
//             </div>
//           }
//           subHeader
//           subHeaderComponent={
//             <input
//               type="text"
//               placeholder="Search..."
//               className="form-control w-25"
//               onChange={(e) => {
//                 // Implement your search functionality here
//               }}
//             />
//           }
//           customStyles={{
//             headCells: {
//               style: {
//                 backgroundColor: "#f8f9fa",
//                 fontWeight: "bold",
//               },
//             },
//             cells: {
//               style: {
//                 padding: "8px",
//                 verticalAlign: "middle",
//               },
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default DisplayClient;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import {
  deleteAddClientForm,
  getAllFullClients,
  updateClientLeadStatus,
} from "../../../redux/feature/ClientRedux/ClientThunx";
import { useNavigate } from "react-router-dom";

function DisplayClient({ setActiveTab, setEditId }) {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.client);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getAllFullClients());
  }, [dispatch]);

  useEffect(() => {
    // Sort clients by createdAt date (newest first)
    const sortedClients = [...clients].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Map the data with all required fields
    const mappedData = sortedClients.map((client) => {
      const personal = client.personalDetails || {};
      const contact = client.contactInfo || {};

      return {
        id: client._id,
        groupCode: personal.groupCode || "-",
        paName: contact.paName || "-",
        name: `${personal.salutation || ""} ${
          personal.groupName || personal.name || ""
        }`.trim(),
        mobile: personal.contactNo || contact.mobileNo || "",
        email: personal.emailId || personal.email ||  "" ,
       
       meetingArea: personal.preferredMeetingArea || "",
       meetinAdd:   personal.preferredMeetingAddr || "",
      // rsAdd:    personal.resiAddr ||
          // personal.officeAddr ||
        
        city: personal.city || "-",
        createdAt: client.createdAt || new Date().toISOString(),
      };
    });

    // Apply search filter if search text exists
    if (searchText) {
      const lowerCaseSearch = searchText.toLowerCase();
      const filtered = mappedData.filter((item) => {
        const mobileString = item.mobile ? item.mobile.toString() : "";
        return (
          (item.group && item.group.toLowerCase().includes(lowerCaseSearch)) ||
          (item.paName && item.paName.toLowerCase().includes(lowerCaseSearch)) ||
          mobileString.includes(searchText) ||
          (item.name && item.name.toLowerCase().includes(lowerCaseSearch))
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(mappedData);
    }
  }, [clients, searchText]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      dispatch(deleteAddClientForm(id));
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    setActiveTab("add");
  };

  const handleView = (id) => {
    navigate(`/customer-detail/${id}`);
  };

  const handleConvertStatus = (id, status) => {
    dispatch(updateClientLeadStatus({ id, status }))
      .unwrap()
      .then(() => dispatch(getAllFullClients()));
  };

  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
      sortable: true,
      width: "60px",
    },
    {
      name: "Group Code",
      selector: (row) => row.groupCode,
      sortable: true,
    },
    {
      name: "Group Head",
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: "Name",
    //   selector: (row) => row.name,
    //   sortable: true,
    // },
     {
      name: "Address",
      selector: (row) => row.meetinAdd  ,
      sortable: true,
    },
    {
      name: "Contact No",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
   
    {
      name: "Area",
      selector: (row) => row.meetingArea,
      sortable: true,
    },
    // {
    //   name: "Created At",
    //   selector: (row) => new Date(row.createdAt).toLocaleString(),
    //   sortable: true,
    //   width: "160px",
    // },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex flex-wrap gap-1">
          <Button
            variant="warning"
            size="sm"
            onClick={() => handleEdit(row.id)}
            className="text-nowrap"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row.id)}
            className="text-nowrap"
          >
            Delete
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => handleView(row.id)}
            className="text-nowrap"
          >
            View
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      width: "220px",
    },
    {
      name: "Convert",
      cell: (row) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleConvertStatus(row.id, "prospect")}
          className="text-nowrap"
        >
          To Prospect
        </Button>
      ),
      ignoreRowClick: true,
      width: "120px",
    },
  ];

  if (loading)
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" />
      </div>
    );
    
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="w-100 p-2 mt-4">
      <h3>Client List</h3>
      <div className="card shadow-sm">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          defaultSortFieldId="createdAt"
          defaultSortAsc={false}
          highlightOnHover
          responsive
          striped
          bordered
          fixedHeader
          fixedHeaderScrollHeight="600px"
          progressPending={loading}
          progressComponent={
            <div className="py-5">
              <Spinner animation="border" />
            </div>
          }
          subHeader
          subHeaderComponent={
            <div className="w-100 d-flex justify-content-between">
              <input
                type="text"
                placeholder="Search by Group Code, PA Name, Contact No, or Name..."
                className="form-control"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="ms-2">
                <Button
                  variant="secondary"
                  onClick={() => setSearchText("")}
                  disabled={!searchText}
                >
                  Clear
                </Button>
              </div>
            </div>
          }
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#f8f9fa",
                fontWeight: "bold",
              },
            },
            cells: {
              style: {
                padding: "8px",
                verticalAlign: "middle",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default DisplayClient;
