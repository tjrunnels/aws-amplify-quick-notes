import React from "react";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import styled from "@emotion/styled";

const StyledDialogOverlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: hsla(120, 29%, 97%, 0.95);
  padding: 24px;
  z-index: 99;
`;

const StyledDialogContent = styled(DialogContent)`
  background-color: #ffffff;
  border-radius: 4px;
  max-width: 800px;
  box-shadow: 0 0 9px rgba(255, 255, 255, 0.3);
  padding: 24px;
  margin: 24px auto;
`;

//export a container that looks like a pop-up
export default props => (
  <Dialog>
    <StyledDialogOverlay>
      <StyledDialogContent>{props.children}</StyledDialogContent>
    </StyledDialogOverlay>
  </Dialog>
);
