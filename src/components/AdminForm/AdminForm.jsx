import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import {
  editTaskAdminThunk,
  deleteTaskAdminThunk,
} from "../../redux/tasksOperations";
import { toast } from "react-hot-toast";
import css from "../../components/TaskForm/TaskForm.module.css";

const AdminForm = ({ selectedTask, onDelete }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState(selectedTask || {});

  useEffect(() => {
    setTask(selectedTask || {});
  }, [selectedTask]);

  const initialValues = {
    taskName: task.taskName || "",
    taskDescription: task.taskDescription || "",
    deadlineDate: task.deadlineDate
      ? new Date(task.deadlineDate).toISOString().split("T")[0]
      : "",
    mark: task.mark || "",
    state: task.state || "pending",
  };

  const validationSchema = yup.object().shape({
    taskName: yup.string().required("Task name is required").trim(),
    taskDescription: yup
      .string()
      .required("Task description is required")
      .trim(),
    deadlineDate: yup.date().required("Deadline date is required"),
    mark: yup
      .number()
      .required("Mark is required")
      .min(0, "Mark cannot be less than 0")
      .max(100, "Mark cannot exceed 100"),
    state: yup.string().required("State is required"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(editTaskAdminThunk({ id: task._id, ...values })).unwrap();
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Failed to update task.");
    }
    actions.resetForm({ values });
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTaskAdminThunk(task._id)).unwrap();
      toast.success("Task deleted successfully!");
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  return (
    <div className="sub-card">
      <h2 className="component-title">Edit or Delete a task</h2>
      {task && task._id ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form>
            <div className={css.sidesContainer}>
              <div className={css.containerLeft}>
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
                    <Field type="date" id="deadlineDate" name="deadlineDate" />
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
              </div>
            </div>
            <div className={css.buttons}>
              <button type="submit" className={css.btn}>
                Save
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className={`${css.btn} ${css.deleteButton}`}
              >
                Delete
              </button>
            </div>
          </Form>
        </Formik>
      ) : (
        <p>Select a task to edit</p>
      )}
    </div>
  );
};

export default AdminForm;
