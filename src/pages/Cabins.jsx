import React, { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabinData } from "../services/apiCabin";
import CabinTable from "../features/cabins/CabinTable";
import { useQuery } from "@tanstack/react-query";

function Cabins() {
 
  
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable></CabinTable>
      </Row>
    </>
  );
}

export default Cabins;
