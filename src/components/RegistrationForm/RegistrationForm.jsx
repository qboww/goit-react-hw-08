import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useId } from "react";
import * as yup from "yup";
import css from "./RegistrationForm.module.css";

import { registerThunk } from "../../redux/authOperations";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name is too Short!")
    .max(50, "Name is too Long!")
    .required("Please, provide your name"),
  email: yup
    .string()
    .email("Please, provide your valid email!")
    .required("Please, provide your email"),
  password: yup
    .string()
    .min(7, "Password is too Short!")
    .max(18, "Password is too Long!")
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
        <div className={css.parentWrapper}>
          <div className={css.wrapper}>
            <Form className="sub-card">
              <div className={css.inputsContainer}>
                <div className={css.wrapper}>
                  <h2 className="component-title">Register an account</h2>
                  <label htmlFor={nameFieldId}>Username</label>
                  <div className="input-error">
                    <Field
                      className={css.input}
                      type="text"
                      name="name"
                      placeholder="Enter you username..."
                      id={nameFieldId}
                    />
                    <ErrorMessage className="error" name="name" component="span" />
                  </div>
                </div>
                <div className={css.wrapper}>
                  <label htmlFor={emailFieldId}>Email</label>
                  <div className="input-error">
                    <Field
                      className={css.input}
                      type="email"
                      name="email"
                      placeholder="Enter you email..."
                      id={emailFieldId}
                    />
                    <ErrorMessage className="error" name="email" component="span" />
                  </div>
                </div>
                <div className={css.wrapper}>
                  <label htmlFor={passwordFieldId}>Password</label>
                  <div className="input-error">
                    <Field
                      className={css.input}
                      type="password"
                      name="password"
                      placeholder="Enter you password..."
                      id={passwordFieldId}
                    />
                    <ErrorMessage
                      className="error"
                      name="password"
                      component="span"
                    />
                  </div>
                  <div className={css.linkContainer}>
                    <NavLink className={css.link} to="/login">
                      Create account now!
                    </NavLink>
                  </div>
                  <button aria-label="Register" className={css.btn} type="submit">
                    Register
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default RegistrationForm;
