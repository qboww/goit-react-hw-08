import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useId } from "react";
import * as Yup from "yup";
import css from "./LoginForm.module.css";

import { loginThunk } from "../../redux/auth/operations";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please, provide your valid email!")
    .required("Please, provide your email"),
  password: Yup.string()
    .min(7, "Too Short!")
    .max(18, "Too Long!")
    .required("Please, provide your password"),
});

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(loginThunk(values));
    actions.resetForm();
  };

  return (
    <div className="container">
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <div className={css.container}>
          <Form className={css.formContainer}>
            <div className={css.inputsContainer}>
              <div className={css.inputContainer}>
                <h2 className={css.login}>Login</h2>
                <label htmlFor={emailFieldId}>Email</label>
                <Field
                  className={css.input}
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  id={emailFieldId}
                />
                <ErrorMessage
                  className={css.error}
                  name="email"
                  component="span"
                />
              </div>
              <div className={css.inputContainer}>
                <label htmlFor={passwordFieldId}>Password</label>
                <Field
                  className={css.input}
                  type="text"
                  name="password"
                  placeholder="Enter your password..."
                  id={passwordFieldId}
                />
                <ErrorMessage
                  className={css.error}
                  name="password"
                  component="span"
                />

                <label className={css.labelContainer}>
                  <Link to="/register" className={css.loginLabel}>
                    Do not have account?
                  </Link>
                </label>
                <div className={css.btnContainer}>
                  <button type="submit" className={css.btn}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
};
export default LoginForm;
