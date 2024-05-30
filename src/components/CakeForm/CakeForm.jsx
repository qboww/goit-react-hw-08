import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import CreatableSelect from "react-select/creatable";
import {
  addCakeThunk,
  fetchIngredientsThunk,
} from "../../redux/cakesOperations";
import { selectIngredients } from "../../redux/cakesSlice";
import { toast } from "react-hot-toast";
import css from "./CakeForm.module.css";

const CakeForm = () => {
  const dispatch = useDispatch();
  const ingredientOptions = useSelector(selectIngredients);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    dispatch(fetchIngredientsThunk());
  }, [dispatch]);

  const initialValues = {
    name: "",
    weight: "",
    price: "",
    components: [],
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required").trim(),
    weight: yup
      .number()
      .required("Weight is required")
      .positive("Weight must be positive"),
    price: yup
      .number()
      .required("Price is required")
      .positive("Price must be positive"),
    components: yup
      .array()
      .of(yup.string())
      .required("Components are required"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(addCakeThunk(values)).unwrap();
      toast.success("Cake created successfully!");
      actions.resetForm();
      setSelectedIngredients([]); // Reset selected ingredients after form submission
    } catch (error) {
      toast.error("Failed to create cake.");
    }
  };

  const handleIngredientChange = (selectedOptions) => {
    setSelectedIngredients(selectedOptions);
  };

  const handleCreateIngredient = (inputValue) => {
    const newIngredient = { value: inputValue, label: inputValue };
    setSelectedIngredients([...selectedIngredients, newIngredient]);
    dispatch({ type: "cakes/addIngredient", payload: newIngredient });
  };

  return (
    <div className="sub-card">
      <h2 className="component-title">Add Cake</h2>
      <Formik
        initialValues={{
          ...initialValues,
          components: selectedIngredients.map((option) => option.value),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className={css.sidesContainer}>
              <div className={css.containerLeft}>
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
              </div>
              <div className={css.containerRight}>
                <div className={css.taskDescription}>
                  <label htmlFor="components">Components</label>
                  <CreatableSelect
                    id="components"
                    name="components"
                    options={ingredientOptions}
                    value={selectedIngredients}
                    onChange={(options) => {
                      handleIngredientChange(options);
                      setFieldValue(
                        "components",
                        options.map((option) => option.value),
                      );
                    }}
                    onCreateOption={handleCreateIngredient}
                    isMulti
                    placeholder="Select or create components..."
                  />
                  <ErrorMessage
                    className="error"
                    name="components"
                    component="span"
                  />
                </div>
              </div>
            </div>
            <div className={css.buttons}>
              <button type="submit" className={css.btn}>
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CakeForm;
