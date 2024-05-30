import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useId } from "react";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";
import css from "./LoginForm.module.css";

import { loginThunk } from "../../redux/authOperations";

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

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(loginThunk(values)).unwrap();
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please check your email and password.");
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
        <div className={css.parentWrapper}>
          <div className={css.wrapper}>
            <Form className="sub-card">
              <div className={css.inputsContainer}>
                <div className={css.inputContainer}>
                  <h2 className="component-title">Login</h2>
                  <label htmlFor={emailFieldId}>Email</label>
                  <div className="input-error">
                    <Field
                      className={css.input}
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
                      className={css.input}
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

                  <button aria-label="Login" type="submit" className={css.btn}>
                    Login
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
      <Toaster />
    </div>
  );
};

export default LoginForm;
