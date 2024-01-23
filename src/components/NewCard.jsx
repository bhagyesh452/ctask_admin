import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EnhancedTable from "./EnhancedTableHead";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function NewCard({ name, year, ctype, damount }) {
  const [data, setData] = useState([]);
  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/leads");

      // Set the retrieved data in the state
      const filteredData = response.data.filter(
        (item) => item.ename === "Select Employee"
      );

      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    // Fetch data from the Node.js server
    // Call the fetchData function
    fetchData();
  }, []);

  function formatDate(inputDate) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }

  const [selectedRows, setSelectedRows] = useState([]);
  const handleCheckboxChange = (row) => {
    // If the row is 'all', toggle all checkboxes
    if (row === "all") {
      // If all checkboxes are already selected, clear the selection; otherwise, select all
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.length === data.length ? [] : data.map((row) => row)
      );
    } else {
      // Toggle the selection status of the row
      setSelectedRows((prevSelectedRows) => {
        const isRowSelected = prevSelectedRows.some(
          (selectedRow) => selectedRow._id === row._id
        );

        if (isRowSelected) {
          return prevSelectedRows.filter(
            (selectedRow) => selectedRow._id !== row._id
          );
        } else {
          return [...prevSelectedRows, row];
        }
      });
    }
  };

  const handleConfirmAssign = () => {
    closepopup();
    Swal.fire("Data assigned");
  };

  const [filteredData, setfilteredData] = useState([]);

  const handleManualAssign = () => {
    setfilteredData(data);
    functionopenpopup();
  };

  const handleDirectAssign = () => {
    const filterednewData = data.filter((item) =>
      item["Company Name"].includes("Private Limited")
    );

    setfilteredData(filterednewData);
    console.log(data);

    functionopenpopup();
    // .filter((item) => {
    //   const incorporationDate = item["Company Incorporation Date  "];
    //   const nyear = new Date(incorporationDate).getFullYear();
    //   return nyear === year; // Replace selectedYear with your desired year
    // });
  };

  return (
    <Box sx={{ minWidth: 275, width: "28vw" }}>
      <Card style={{ padding: "10px" }} variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              style={{ fontSize: "18px" }}
              variant="h5"
              component="div"
            >
              {name} is requesting for Data
            </Typography>
            <Typography color="text.secondary">Year : {year}</Typography>
            <Typography color="text.secondary">
              Company Type : {ctype}
            </Typography>
            <Typography color="text.secondary">
              Number of Data : {damount}
            </Typography>
          </CardContent>

          <div
            style={{ display: "flex", justifyContent: "space-around" }}
            className="footerbutton"
          >
            <button
              style={{
                width: "100vw",
                borderRadius: "0px",
                backgroundColor: "green",
              }}
              className="btn btn-primary d-none d-sm-inline-block"
              onClick={handleDirectAssign}
            >
              Accept
            </button>
            <button
              style={{
                width: "100vw",
                borderRadius: "0px",
                backgroundColor: "red",
              }}
              className="btn btn-primary d-none d-sm-inline-block"
              onClick={handleManualAssign}
            >
              Assign Manually
            </button>
          </div>
        </React.Fragment>
      </Card>
      <Dialog open={open} onClose={closepopup} fullWidth maxWidth="lg">
        <DialogTitle>
          No of results {filteredData.length}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          {/* Table content */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #ddd",
              }}
              className="table-vcenter table-nowrap"
            >
              <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <th
                    style={{
                      position: "sticky",
                      left: "0px",
                      zIndex: 1,
                      backgroundColor: "rgb(242, 242, 242)",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredData.length}
                      onChange={() => handleCheckboxChange("all")}
                    />
                  </th>
                  <th
                    style={{
                      position: "sticky",
                      left: "30px",
                      zIndex: 1,
                      backgroundColor: "rgb(242, 242, 242)",
                    }}
                  >
                    Sr.No
                  </th>
                  <th
                    style={{
                      position: "sticky",
                      left: "80px",
                      zIndex: 1,
                      backgroundColor: "rgb(242, 242, 242)",
                    }}
                  >
                    Company Name
                  </th>
                  <th>Company Number</th>
                  <th>Company Email</th>
                  <th>Incorporation Date</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              {filteredData.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      No data available
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {filteredData.map((company, index) => (
                    <tr key={index} style={{ border: "1px solid #ddd" }}>
                      <td
                        style={{
                          position: "sticky",
                          left: 0,
                          zIndex: 1,
                          backgroundColor: "rgb(242, 242, 242)",
                        }}
                      >
                        <input
                          checked={selectedRows.includes(company)}
                          onChange={() => handleCheckboxChange(company)}
                          type="checkbox"
                        />
                      </td>
                      <td
                        style={{
                          position: "sticky",
                          left: "30px",
                          zIndex: 1,
                          backgroundColor: "rgb(242, 242, 242)",
                        }}
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{
                          position: "sticky",
                          left: "80px",

                          background: "white",
                        }}
                      >
                        {company["Company Name"]}
                      </td>
                      <td>{company["Company Number"]}</td>
                      <td>{company["Company Email"]}</td>
                      <td>
                        {formatDate(company["Company Incorporation Date  "])}
                      </td>
                      <td>{company["City"]}</td>
                      <td>{company["State"]}</td>
                      <td>{company["Status"]}</td>
                      <td>{company["Remarks"]}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
          <div className="btn-list">
            <button
              style={{ width: "100vw", borderRadius: "0px" }}
              onClick={handleConfirmAssign}
              className="btn btn-primary ms-auto"
            >
              Assign Data
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </Box>
  );
}