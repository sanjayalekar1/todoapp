import React from "react";
import { Container, Grid } from "@mui/material";
import ListComponent from "./ListComponent";

const BoardComponent = (props) => {
  const boards = [
    {
      title: "Backlog",
    },
    {
      title: "Todo",
    },
    {
      title: "Ongoing",
    },
    {
      title: "Done",
    },
  ];

  return (
    <>
      <Container>
        <ListComponent />
      </Container>
    </>
  );
};

export default BoardComponent;
