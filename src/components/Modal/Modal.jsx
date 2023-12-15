import React, { useState } from "react";
import "./modal.css";
import { useDispatch } from "react-redux";
import { addCompany } from "../../redux/slices/companySlice";
import { addEmployee } from "../../redux/slices/employeeSlice";

const Modal = ({ setIsVisible, title }) => {
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState({});
  console.log(title);

  const properties = {
    companies: ["name", "city"],
    employees: ["name", "lastname", "position", "companyId"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const addNew = (type) => {
    if (
      Object.keys(newItem).length !==
      properties[title].filter((el) => el !== "amount").length
    ) {
      alert("Все поля должны быть заполнены");
      return;
    }
    switch (type) {
      case "employees":
        dispatch(addEmployee(newItem));
        break;
      case "companies":
        dispatch(addCompany(newItem));
        break;
    }
    setIsVisible(false);
  };

  return (
    <>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span onClick={() => setIsVisible((prev) => !prev)} className="close">
            &times;
          </span>
          <div>
            {properties[title].map((el) => (
              <div style={{ marginBottom: "10px" }} key={el}>
                <label htmlFor={el}>{el}</label>
                <input
                  name={el}
                  id={el}
                  type={el === "companyId" ? "number" : "text"}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={() =>
                title === "employees"
                  ? addNew("employees")
                  : addNew("companies")
              }
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
