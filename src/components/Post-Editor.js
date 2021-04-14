import React from "react";
import styled from "@emotion/styled";
import { Button } from "@rebass/emotion";
import { Label, Input } from "@rebass/forms";
import { Formik } from "formik";

import Dialog from "./Dialog";


const Container = styled("div")`
  max-width: 800px;
  max-height: 375px;
  margin: 16px auto;
  width: 100%;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(116, 180, 155, 0.2);
  padding: 24px;

`;


//React Objects with style, based off "Button"
const StyledButton = styled(Button)`
  background-color: #74b49b;
  cursor: pointer;
`;
//  ''
const StyledLabel = styled(Label)`
  color: #74b49b;
  margin-bottom: 4px;
`;
//  ''
const StyledInput = styled(Input)`
  color: #74b49b;
  border: 2px solid #74b49b;
  border-radius: 10px;
  background-color: #f4f9f4;
  width: 100%;
  padding: 10px;
`;
//  ''
const StyledTextarea = styled("textarea")`
  color: #74b49b;
  background-color: #f4f9f4;
  width: 100%;
  min-height: 80px;
  border: 2px solid #74b49b;
  border-radius: 10px;
  resize: none;
  padding: 10px;
`;
//  ''
const FormInputs = styled("div")`
  max-height: 450px;
  /*   overflow: scroll;  */
  padding: 16px;

  @media (max-height: 570px) {
    max-height: 300px;
  }

  @media (max-height: 675px) {
    max-height: 350px;
  }
`;
//  ''
const Actions = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
`;
//  ''
const InputContainer = styled("div")`
  margin-bottom: 16px;
`;
//  ''
const Title = styled("h2")`
  color: #74b49b;
`;

//export props in {this}
export default props => (
    //
    <Container>

        {/* if a title doesn't exist (aka no prop) then it must be new */}
        <Title>{props.title ? "Edit Post" : "Create Post"}</Title>

        {/* Everything else is a "Formik", which is an open source form builder for React */}
        <Formik
        initialValues={{
            title: props.title || "",
            text: props.text
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            //on submit, run "onSave" prop with these as "data"
            props.onSave({
                title: values.title || `${values.text.substr(0, 20)}...`,
                text: values.text
            });
            
            setSubmitting(false);
            resetForm();
            
            //run "onDismiss" prop
            props.onDismiss();
        }}
        >
        {/* Don't really know where these variables are coming from  */}
        {({ values, handleSubmit, isSubmitting, handleChange }) => (
            <form onSubmit={handleSubmit}>

                {/* Inputs */}
                    <FormInputs>
                        <InputContainer>
                            <StyledLabel htmlFor="title">Title</StyledLabel>
                            <StyledInput
                                type="text"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                            />
                        </InputContainer>

                        <InputContainer>
                            <StyledLabel htmlFor="text">Content</StyledLabel>
                            <StyledTextarea
                                name="text"
                                value={values.text}
                                onChange={handleChange}
                            />
                        </InputContainer>
                    </FormInputs>


                {/* Actions */}
                    <Actions>
                        {/* The Cancel button runs the "onDismiss" prop */}
                        <StyledButton
                            onClick={() => {
                                props.onDismiss();
                            }}
                            style={{ marginRight: "8px" }}
                        >
                            Cancel
                        </StyledButton>


                        {/* Setting the type to "sumbit" allows it to run other onSubmit functions */}
                        <StyledButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save"}
                        </StyledButton>

                    </Actions>
                    
            </form>
        )}
        </Formik>
    </Container>

);
