import React from "react";

import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles/>
      <StyledApp>

        <Heading as="h1">Wild Oasis</Heading>
        <Heading as="h2">Check in and out</Heading>
        <Button>Check In</Button>
        <Button>Check Out</Button>
        <Heading as="h3">Forms</Heading>

        <Input type="text" placeholder="No of guest"></Input>
      </StyledApp>
    </>
  );
}

export default App;
