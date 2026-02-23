import useReminders from "./useReminders";

const ReminderPage = () => {
  const { reminders, addReminder, deleteReminder } = useReminders();

  return (
    <div>
      <button
        onClick={() =>
          addReminder("Test Reminder", "2026-02-25T10:00")
        }
      >
        Add Reminder
      </button>

      {reminders.map((r) => (
        <div key={r.id}>
          <h3>{r.title}</h3>
          <p>{r.datetime}</p>
          <button onClick={() => deleteReminder(r.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReminderPage;