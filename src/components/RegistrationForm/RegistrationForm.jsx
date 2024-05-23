import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useId } from "react";
import * as yup from "yup";
import css from "./RegistrationForm.module.css";

import { registerThunk } from "../../redux/auth/operations";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Please, provide your name"),
  email: yup
    .string()
    .email("Please, provide your valid email!")
    .required("Please, provide your email"),
  password: yup
    .string()
    .min(7, "Too Short!")
    .max(18, "Too Long!")
    .required("Please, provide your password"),
});

const RegistrationForm = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(registerThunk(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <div className="container">
        <Form className={css.form}>
          <div className={css.inputsContainer}>
            <div className={css.wrapper}>
              <h2 className={css.register}>Register an account</h2>
              <label htmlFor={nameFieldId}>Username</label>
              <Field
                className={css.input}
                type="text"
                name="name"
                placeholder="Enter you username..."
                id={nameFieldId}
              />
              <ErrorMessage className={css.error} name="name" component="span" />
            </div>
            <div className={css.wrapper}>
              <label htmlFor={emailFieldId}>Email</label>
              <Field
                className={css.input}
                type="email"
                name="email"
                placeholder="Enter you email..."
                id={emailFieldId}
              />
              <ErrorMessage className={css.error} name="email" component="span" />
            </div>
            <div className={css.wrapper}>
              <label htmlFor={passwordFieldId}>Password</label>
              <Field
                className={css.input}
                type="password"
                name="password"
                placeholder="Enter you password..."
                id={passwordFieldId}
              />
              <ErrorMessage
                className={css.error}
                name="password"
                component="span"
              />
              <div className={css.linkContainer}>
                <NavLink className={css.link} to="/login">
                  Already have an account?
                </NavLink>
              </div>
              <div className={css.btnContainer}>
                <button className={css.btn} type="submit">
                  Register
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default RegistrationForm;
