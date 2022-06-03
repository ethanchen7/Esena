import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { editTask } from "../../store/tasks";
import Select from "react-select";
import CompleteTaskButton from "../CompleteTaskButton";
import "./EditTaskForm.css";

const EditTaskForm = ({ setShowModal, taskId, projectName }) => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks[taskId]);
  const projectId = task?.project_id;

  const sessionUser = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.teammates.allUsers);
  const currentTeammatesIds = useSelector(
    (state) => state.projects[projectId].members
  );
  const teammates = Object.values(allUsers).filter((user) =>
    currentTeammatesIds.includes(user.id)
  );
  teammates.push(sessionUser);

  const [month, date, year] = task.end_date.split("/");
  const prevEndDate = `${year}-${month}-${date}`;

  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [endDate, setEndDate] = useState(prevEndDate);
  const [priority, setPriority] = useState(task.priority_id);
  const [status, setStatus] = useState(task.status_id);
  const [assignee, setAssignee] = useState(task.assignee_id.toString());

  const [validationErrors, setValidationErrors] = useState([]);

  const assigneeOptions = teammates.map((teammate) => {
    return { label: `${teammate.first_name}`, value: `${teammate.id}` };
  });

  const priorityOptions = [
    { label: "Low", value: "1" },
    { label: "Medium", value: "2" },
    { label: "High", value: "3" },
  ];
  const statusOptions = [
    { label: "Off Track", value: "1" },
    { label: "At Risk", value: "2" },
    { label: "On Track", value: "3" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validationErrors.length) {
      const payload = {
        name,
        description,
        end_date: endDate,
        priority_id: parseInt(priority),
        status_id: parseInt(status),
        assignee_id: parseInt(assignee),
        // is_completed: isCompleted
      };
      console.log(payload);

      dispatch(editTask(payload, taskId));

      setShowModal(false);
    }
  };

  useEffect(() => {
    const errors = [];
    if (!name) errors.push("Please enter a task name!");
    if (!description)
      errors.push(
        "Your teammates want to know what the task is about! Please enter a description."
      );
    setValidationErrors(errors);
  }, [name, description]);
  console.log(assignee);
  console.log(assigneeOptions);
  return (
    <div className="form-outer-container">
      <div className="form-header">
        <h1>Edit Task</h1>
        <p className="task-project-name">{projectName}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Task Name</label>
          <input
            name="name"
            placeholder="Enter a task name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="add-task-form-grouping">
          <div className="second-form-control">
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="third-form-control">
            <label>Assign Team Member</label>
            <Select
              id="assign-member"
              name="assignee_id"
              options={assigneeOptions}
              value={assignee.value}
              defaultValue={assigneeOptions.filter(
                (option) => option.value == assignee
              )}
              onChange={(option) => setAssignee(option.value)}
              placeholder="Select a member..."
            />
          </div>
        </div>
        <div className="form-grouping-select">
          <div className="select-control">
            <label>Priority</label>
            <Select
              options={priorityOptions}
              value={priority.value}
              defaultValue={priorityOptions.filter(
                (option) => option.value == priority
              )}
              onChange={(option) => setPriority(option.value)}
              placeholder="Select a priority..."
            />
          </div>
          <div className="select-control">
            <label>Status</label>
            <Select
              options={statusOptions}
              value={status.value}
              defaultValue={statusOptions.filter(
                (option) => option.value == status
              )}
              onChange={(option) => setStatus(option.value)}
              placeholder="Select a status..."
            />
          </div>
        </div>

        <div className="form-control">
          <label>Task Description</label>
          <textarea
            name="description"
            placeholder="Enter description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="edit-task-footer-btns">
          <CompleteTaskButton taskId={taskId} setShowModal={setShowModal} />
          <div className="task-footer-grouping">
            <button className="cancelBtn edit-tsk-btns" type="cancel">
              Cancel
            </button>
            <button className="submitBtn edit-tsk-btns" type="submit">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditTaskForm;
