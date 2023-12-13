import React from "react";
// import icon from "../../icon1.jpg";
import banner from "../../banner.jpg";
import "../../App.css";

const Jumotron = () => {
  const paddingStyle = {
    padding: "0rem 0rem",
    backgroundColor: "white",
    marginBottom: "15px",
  };
  return (
    <div className="jumbotron" style={paddingStyle}>
      <img
        src={banner}
        alt="icon"
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

// style={{
//       width: "100%",
//       position: "absolute",
//       top: 0,
//       left: 0,
// }}
export default Jumotron;
