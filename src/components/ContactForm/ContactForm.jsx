import { Field, Formik, Form, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { useId } from "react";

import { addContact } from "../../redux/contactsOps";
import { useDispatch } from "react-redux";

import * as yup from "yup";

import css from "./ContactForm.module.css";

const initialValues = {
  id: nanoid(),
  name: "",
  number: "",
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),
  number: yup
    .string()
    .required("Number is required")
    .matches(/^[\d-]+$/, "Number must contain only digits or hyphens")
    .min(3, "Number must be at least 3 characters")
    .max(12, "Number cannot exceed 12 characters"),
});

export const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));

    actions.resetForm();
  };

  return (
    <div className="sub-card">
      <h2>Add a person</h2>
      <div className={css.contactForm}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <label htmlFor={nameFieldId}>Name</label>
              <Field
                type="text"
                id={nameFieldId}
                name="name"
                placeholder="Enter name..."
              />
              <ErrorMessage
                className={css.error}
                name="name"
                component="span"
              />
            </div>
            <div>
              <label htmlFor={numberFieldId}>Number</label>
              <Field
                type="text"
                id={numberFieldId}
                name="number"
                placeholder="Enter phone number..."
              />
              <ErrorMessage
                className={css.error}
                name="number"
                component="span"
              />
            </div>
            <button type="submit">Add contact</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
