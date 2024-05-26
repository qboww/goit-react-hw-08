import { Field, Form, Formik, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import css from "./TaskForm.module.css";

import { useId } from "react";
import { addTaskThunk } from "../../redux/tasksOperations";

const TaskForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    courseName: "",
    taskName: "",
    taskDescription: "",
    deadlineDate: "",
    mark: "",
    state: "pending",
  };

  const validationSchema = yup.object().shape({
    courseName: yup
      .string()
      .required("Course name is required")
      .min(2, "Course name must be at least 2 characters")
      .max(50, "Course name cannot exceed 50 characters")
      .trim(),
    taskName: yup
      .string()
      .required("Task name is required")
      .min(3, "Task name must be at least 3 characters")
      .max(50, "Task name cannot exceed 50 characters")
      .trim(),
    taskDescription: yup
      .string()
      .required("Task description is required")
      .min(10, "Task description must be at least 10 characters")
      .max(200, "Task description cannot exceed 200 characters")
      .trim(),
    deadlineDate: yup.date().required("Deadline date is required"),
    mark: yup
      .number()
      .required("Mark is required")
      .min(0, "Mark cannot be less than 0")
      .max(100, "Mark cannot exceed 100"),
    state: yup.string().required("State is required"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(addTaskThunk(values));
    actions.resetForm();
  };

  const courseNameFieldId = useId();
  const taskNameFieldId = useId();
  const taskDescriptionFieldId = useId();
  const deadlineDateFieldId = useId();
  const markFieldId = useId();
  const stateFieldId = useId();

  return (
    <div className="sub-card">
      <h2 className="component-title">Add a task</h2>
      <div className={css.taskForm}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className={css.sidesContainer}>
              <div className={css.containerLeft}>
                <div>
                  <label htmlFor={courseNameFieldId}>Course Name</label>
                  <div className="input-error">
                    <Field
                      type="text"
                      id={courseNameFieldId}
                      name="courseName"
                      placeholder="Enter course name..."
                    />
                    <ErrorMessage
                      className="error"
                      name="courseName"
                      component="span"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={taskNameFieldId}>Task Name</label>
                  <div className="input-error">
                    <Field
                      type="text"
                      id={taskNameFieldId}
                      name="taskName"
                      placeholder="Enter task name..."
                    />
                    <ErrorMessage
                      className="error"
                      name="taskName"
                      component="span"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={markFieldId}>Mark</label>
                  <div className="input-error">
                    <Field
                      type="number"
                      id={markFieldId}
                      name="mark"
                      placeholder="Enter mark..."
                    />
                    <ErrorMessage
                      className="error"
                      name="mark"
                      component="span"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={deadlineDateFieldId}>Deadline Date</label>
                  <div className="input-error">
                    <Field
                      type="date"
                      id={deadlineDateFieldId}
                      name="deadlineDate"
                    />
                    <ErrorMessage
                      className="error"
                      name="deadlineDate"
                      component="span"
                    />
                  </div>
                </div>
              </div>
              <div className={css.containerRight}>
                <div className={css.taskDescription}>
                  <label htmlFor={taskDescriptionFieldId}>
                    Task Description
                  </label>
                  <div className="input-error">
                    <Field
                      rows="4"
                      cols="28"
                      as="textarea"
                      id={taskDescriptionFieldId}
                      name="taskDescription"
                      placeholder="Enter task description..."
                    />
                    <ErrorMessage
                      className="error"
                      name="taskDescription"
                      component="span"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={stateFieldId}>State</label>
                  <div className="input-error">
                    <Field as="select" id={stateFieldId} name="state">
                      <option value="pending">Pending</option>
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </Field>
                    <ErrorMessage
                      className="error"
                      name="state"
                      component="span"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className={css.btn} type="submit">
              Add task
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default TaskForm;
