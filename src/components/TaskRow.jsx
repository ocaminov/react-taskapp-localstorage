function TaskRow({ task, toggleTask }) {
  return (
    <tr>
      <td className="d-flex justify-content-between">
        {task.name}
        <input
          type="checkbox"
          name="done"
          id="done"
          checked={task.done}
          onChange={() => toggleTask(task)}
        />
      </td>
    </tr>
  );
}

export default TaskRow;
