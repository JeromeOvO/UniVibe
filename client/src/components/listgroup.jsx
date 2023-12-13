import React from "react";

const ListGroup = (props) => {
  const { items, selectedTag, onTagSelect } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item._id}
          className="list-group-item"
          onClick={() => onTagSelect(item)}
          style={{
            color: "rgba(103,105,109,255)",
            backgroundColor:
              item === selectedTag ? "rgba(167,164,245,255)" : "",
          }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
