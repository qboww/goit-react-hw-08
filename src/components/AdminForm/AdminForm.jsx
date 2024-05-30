import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Select from "react-select";
import { updateCakeThunk, deleteCakeThunk } from "../../redux/cakesOperations";
import { toast } from "react-hot-toast";
import css from "./AdminForm.module.css";

const componentOptions = [
  { value: "cream", label: "Cream" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberries", label: "Strawberries" },
  { value: "blueberries", label: "Blueberries" },
  { value: "nuts", label: "Nuts" },
];

const AdminForm = ({ selectedCake, onDelete }) => {
  const dispatch = useDispatch();
  const [cake, setCake] = useState(selectedCake || {});

  useEffect(() => {
    setCake(selectedCake || {});
  }, [selectedCake]);

  const initialValues = {
    name: cake.name || "",
    components: cake.components
      ? cake.components.map((component) => ({
          value: component,
          label: component,
        }))
      : [],
    weight: cake.weight || "",
    price: cake.price || "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required").trim(),
    components: yup.array().min(1, "Components are required"),
    weight: yup
      .number()
      .required("Weight is required")
      .positive("Weight must be positive"),
    price: yup
      .number()
      .required("Price is required")
      .positive("Price must be positive"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const componentsArray = values.components.map(
        (component) => component.value,
      );
      await dispatch(
        updateCakeThunk({
          id: cake._id,
          cake: { ...values, components: componentsArray },
        }),
      ).unwrap();
      toast.success("Cake updated successfully!");
    } catch (error) {
      toast.error("Failed to update cake.");
    }
    actions.resetForm({ values });
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteCakeThunk(cake._id)).unwrap();
      toast.success("Cake deleted successfully!");
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      toast.error("Failed to delete cake.");
    }
  };

  return (
    <div className="sub-card">
      <h2 className="component-title">Edit or Delete a Cake</h2>
      {cake && cake._id ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div>
                <label htmlFor="name">Name</label>
                <div className="input-error">
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter cake name..."
                  />
                  <ErrorMessage
                    className="error"
                    name="name"
                    component="span"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="weight">Weight</label>
                <div className="input-error">
                  <Field
                    type="number"
                    id="weight"
                    name="weight"
                    placeholder="Enter weight..."
                  />
                  <ErrorMessage
                    className="error"
                    name="weight"
                    component="span"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <div className="input-error">
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter price..."
                  />
                  <ErrorMessage
                    className="error"
                    name="price"
                    component="span"
                  />
                </div>
              </div>
              <div className={css.taskDescription}>
                <label htmlFor="components">Components</label>
                <div className="input-error">
                  <Select
                    id="components"
                    name="components"
                    options={componentOptions}
                    isMulti
                    value={values.components}
                    onChange={(selectedOptions) =>
                      setFieldValue("components", selectedOptions)
                    }
                    placeholder="Select components..."
                  />
                  <ErrorMessage
                    className="error"
                    name="components"
                    component="span"
                  />
                </div>
              </div>
              <div className={css.buttons}>
                <button type="submit" className={css.btn} aria-label="save">
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className={`${css.btn} ${css.deleteButton}`}
                  aria-label="delete"
                >
                  Delete
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <p style={{ color: "black" }}>Select a cake to edit</p>
      )}
    </div>
  );
};

export default AdminForm;
