import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import Select from "react-select";
import { addTaskThunk } from "../../redux/tasksOperations";
import { fetchUsersThunk } from "../../redux/userOperations";
import { selectUsers } from "../../redux/userSlice";
import { toast } from "react-hot-toast";
import css from "./TaskForm.module.css";

const TaskForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    setUserOptions(
      users.map((user) => ({
        value: user._id,
        label: user.name,
      })),
    );
  }, [users]);

  const initialValues = {
    courseName: "",
    taskName: "",
    taskDescription: "",
    deadlineDate: "",
    mark: "",
    state: "pending",
    userId: "",
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
    userId: yup.string().required("User is required"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(addTaskThunk(values)).unwrap();
      toast.success("Task added successfully!");
      actions.resetForm();
    } catch (error) {
      toast.error("Failed to add task.");
    }
  };

  return (
    <div className="sub-card">
      <h2 className="component-title">Add a task</h2>
      <div className={css.taskForm}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className={css.sidesContainer}>
                <div className={css.containerLeft}>
                  <div>
                    <label htmlFor="courseName">Course Name</label>
                    <div className="input-error">
                      <Field
                        type="text"
                        id="courseName"
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
                    <label htmlFor="taskName">Task Name</label>
                    <div className="input-error">
                      <Field
                        type="text"
                        id="taskName"
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
                    <label htmlFor="mark">Mark</label>
                    <div className="input-error">
                      <Field
                        type="number"
                        id="mark"
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
                    <label htmlFor="deadlineDate">Deadline Date</label>
                    <div className="input-error">
                      <Field
                        type="date"
                        id="deadlineDate"
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
                    <label htmlFor="taskDescription">Task Description</label>
                    <div className="input-error">
                      <Field
                        rows="4"
                        cols="28"
                        as="textarea"
                        id="taskDescription"
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
                    <label htmlFor="state">State</label>
                    <div className="input-error">
                      <Field as="select" id="state" name="state">
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
                  <div>
                    <label htmlFor="userId">Assign to User</label>
                    <div className="input-error">
                      <Select
                        id="userId"
                        name="userId"
                        options={userOptions}
                        onChange={(option) =>
                          setFieldValue("userId", option.value)
                        }
                      />
                      <ErrorMessage
                        className="error"
                        name="userId"
                        component="span"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button aria-label="Add Task" className={css.btn} type="submit">
                Add task
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskForm;
