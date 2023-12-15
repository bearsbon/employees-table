import React, { useEffect } from "react";
import Table from "./components/Table/Table.jsx";
import "./global.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCompanies } from "./redux/slices/companySlice.js";
import { fetchAllEmployees } from "./redux/slices/employeeSlice.js";

const companiesTitles = ["name", "city", "amount"];
const employeesTitles = ["name", "lastname", "position"];

const App = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.company);
  const companies = useSelector((state) => state.company.companies);
  const employees = useSelector((state) => state.employee.employees);

  useEffect(() => {
    dispatch(fetchAllCompanies());
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  return (
    <>
      {error && <div> {error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <Table
            tableName="companies"
            data={companies}
            titles={companiesTitles}
          />
          <Table
            tableName="employees"
            data={employees}
            titles={employeesTitles}
          />
        </div>
      )}
    </>
  );
};

export default App;
