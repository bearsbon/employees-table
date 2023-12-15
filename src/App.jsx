import React, { useEffect, useState } from "react";
import Table from "./components/Table/Table.jsx";
import "./global.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCompanies } from "./redux/slices/companySlice.js";
import { fetchAllEmployees } from "./redux/slices/employeeSlice.js";

const App = () => {
  const dispatch = useDispatch();

  const { error, isLoading } = useSelector((state) => state.company);
  const companies = useSelector((state) => state.company.companies);
  const { filteredEmployees, employees, filters } = useSelector(
    (state) => state.employee
  );

  const [selectAllCompanies, setSelectAllCompanies] = useState(false);
  const [selectAllEmployees, setSelectAllEmployees] = useState(false);

  const companiesTitles = ["name", "city", "amount"];
  const employeesTitles = ["name", "lastname", "position"];

  const isSelected = companies.some((el) => filters.includes(el.id));

  useEffect(() => {
    dispatch(fetchAllCompanies());
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  useEffect(() => {
    setSelectAllEmployees(false);
  }, [isSelected]);

  return (
    <>
      {error && <div> {error}</div>}
      {isLoading && employees.length ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <div>
            <Table
              tableName="companies"
              employees={employees}
              filteredEmployees={filteredEmployees}
              data={companies}
              titles={companiesTitles}
              selectAll={selectAllCompanies}
              setSelectAll={setSelectAllCompanies}
            />
          </div>
          <div>
            {isSelected || selectAllCompanies ? (
              <Table
                tableName="employees"
                data={filteredEmployees}
                titles={employeesTitles}
                selectAll={selectAllEmployees}
                setSelectAll={setSelectAllEmployees}
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
