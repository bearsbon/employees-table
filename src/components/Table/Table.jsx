import React, { useEffect, useState } from "react";
import "./table.css";
import TableItem from "./TableItem.jsx";
import { useDispatch } from "react-redux";
import {
  deleteEmployee,
  setFilters,
  clearFilters,
} from "../../redux/slices/employeeSlice.js";
import { deleteCompany } from "../../redux/slices/companySlice.js";
import Modal from "../Modal/Modal.jsx";

const Table = ({
  data,
  employees,
  titles,
  tableName,
  selectAll,
  setSelectAll,
}) => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const handleSelectAll = (e) => {
    if (!data.length) return;

    const allCheckboxes = document
      .querySelector(`#${tableName}`)
      .getElementsByTagName("input");
    for (let item of allCheckboxes) {
      !selectAll ? (item.checked = true) : (item.checked = false);
    }

    const all = data.map((el) => el.id);
    const { name } = e.target;

    setSelectAll(!selectAll);
    name === "employees"
      ? setSelectedEmployees(all)
      : setSelectedCompanies(all);

    if (selectAll === true && name === "employees") {
      setSelectedEmployees([]);
    } else if (selectAll === true && name === "companies") {
      dispatch(clearFilters());
      setSelectedCompanies([]);
    } else if (selectAll === false && name === "employees") {
      const employeeIds = data.map((el) => el.id);
      setSelectedEmployees([...employeeIds]);
    } else {
      dispatch(setFilters(all));
    }
  };

  const handleSelect = (id, event, state) => {
    let updatedList = [...state];
    if (event.target.checked) {
      updatedList = [...state, id];
    } else {
      updatedList.splice(state.indexOf(id), 1);
      setSelectAll(false);
    }

    switch (state) {
      case selectedCompanies:
        const filteredData = employees.reduce(
          (acc, curr) =>
            curr.companyId == id ? (acc.push(curr.id), acc) : acc,
          []
        );
        setSelectedCompanies(updatedList);
        dispatch(setFilters(updatedList));
        break;
      case selectedEmployees:
        setSelectedEmployees(updatedList);
        break;
    }
  };

  const handleDelete = (type) => {
    switch (type) {
      case "employees":
        dispatch(deleteEmployee(selectedEmployees));
        break;
      case "companies":
        dispatch(deleteCompany(selectedCompanies));
        setSelectedCompanies([]);
        break;
    }
    setSelectAll(false);
  };

  return (
    <>
      <div className="button-group">
        <button onClick={() => setIsVisible((prev) => !prev)}>Add new</button>
        <button onClick={() => handleDelete(tableName)}>Delete</button>
      </div>
      <div>
        {isVisible && <Modal setIsVisible={setIsVisible} title={tableName} />}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th colSpan={5}>
              <input
                id={tableName + "_input"}
                type="checkbox"
                checked={selectAll}
                name={tableName}
                onChange={(e) => {
                  handleSelectAll(e);
                }}
              />
              <label htmlFor={tableName + "_input"}>Выделить всё</label>
            </th>
          </tr>
          <tr>
            <th />
            {titles.map((el) => (
              <th key={el}>{el}</th>
            ))}
          </tr>
        </thead>
        <tbody id={tableName}>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5}>No data</td>
            </tr>
          ) : (
            data.map((el) => (
              <TableItem
                key={el.id}
                item={el}
                titles={titles}
                tableName={tableName}
                employeesAmount={
                  tableName === "companies"
                    ? employees.filter(
                        (employee) => employee.companyId === el.id
                      ).length
                    : null
                }
                selectHandler={handleSelect}
                selectAll={selectAll}
                selectedCompanies={selectedCompanies}
                selectedEmployees={selectedEmployees}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
