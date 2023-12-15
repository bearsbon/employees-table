import React, { useEffect, useState } from "react";

const TableItem = ({
  item,
  titles,
  tableName,
  employeesAmount,
  selectHandler,
  selectAll,
  selectedCompanies,
  selectedEmployees,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [data, setData] = useState(item);
  const isEmployeeTable = tableName === "employees";

  useEffect(() => {
    if (
      isEmployeeTable
        ? selectedEmployees.includes(item.id)
        : selectedCompanies.includes(item.id)
    ) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [selectAll]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditable(false);
    }
  };

  return (
    <tr className={checked || selectAll ? "checked" : ""}>
      <td data-label="checkbox">
        <input
          id={data.id}
          type="checkbox"
          onChange={(e) => {
            selectHandler(
              data.id,
              e,
              isEmployeeTable ? selectedEmployees : selectedCompanies
            );
            setChecked(!checked);
          }}
        />
      </td>
      <td onDoubleClick={() => setIsEditable(true)}>
        {isEditable ? (
          <input
            value={data[titles[0]]}
            name={titles[0]}
            type="text"
            className="input-td"
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        ) : (
          data[titles[0]]
        )}
      </td>
      <td onDoubleClick={() => setIsEditable(true)}>
        {isEditable ? (
          <input
            value={data[titles[1]]}
            name={titles[1]}
            type="text"
            className="input-td"
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        ) : (
          data[titles[1]]
        )}
      </td>

      {titles[2] === "amount" ? (
        <td>{employeesAmount}</td>
      ) : (
        <td onDoubleClick={() => setIsEditable(true)}>
          {isEditable ? (
            <input
              value={data[titles[2]]}
              name={titles[2]}
              type="text"
              className="input-td"
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          ) : (
            data[titles[2]]
          )}
        </td>
      )}
    </tr>
  );
};

export default TableItem;
