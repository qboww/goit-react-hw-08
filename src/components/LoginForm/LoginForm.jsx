import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useId } from "react";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import css from "./LoginForm.module.css";

import { loginThunk } from "../../redux/authOperations";
import { selectAuthError } from "../../redux/authSlice";

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
  const authError = useSelector(selectAuthError);

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = async (values, actions) => {
    const resultAction = await dispatch(loginThunk(values));
    if (loginThunk.fulfilled.match(resultAction)) {
      toast.success("Login successful!");
    } else {
      toast.error(authError || "Login failed. Please try again.");
    }
    actions.resetForm();
  };

  return (
    <div className="container">
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="card">
          <div className="sub-card">
            <div className={css.inputsContainer}>
              <div className={css.inputContainer}>
                <h2 className="component-title">Login</h2>
                <label htmlFor={emailFieldId}>Email</label>
                <div className="input-error">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    id={emailFieldId}
                  />
                  <ErrorMessage
                    className="error"
                    name="email"
                    component="span"
                  />
                </div>
              </div>
              <div className={css.inputContainer}>
                <label htmlFor={passwordFieldId}>Password</label>
                <div className="input-error">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password..."
                    id={passwordFieldId}
                  />
                  <ErrorMessage
                    className="error"
                    name="password"
                    component="span"
                  />
                </div>
                <label className={css.labelContainer}>
                  <Link to="/register" className={css.loginLabel}>
                    Do not have an account?
                  </Link>
                </label>
                <div className={css.btnContainer}>
                  <button type="submit" className={css.btn}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
