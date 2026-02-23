import { useState, useEffect } from 'react';
import { playRingtone, stopRingtone } from './ringtones';

const API_URL = 'http://localhost:5001/api/reminders';

export const useReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('soonest');
  const [editingId, setEditingId] = useState(null);
  const [activeAlarm, setActiveAlarm] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    note: '',
    datetime: '',
    ringtone: 'classic'
  });

  // Edit form state
  const [editData, setEditData] = useState({
    title: '',
    note: '',
    datetime: ''
  });

  // Fetch reminders on mount
  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setReminders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      setLoading(false);
    }
  };

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    }
  }, []);

  // Request notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    }
  };

  // Check for triggered alarms
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      reminders.forEach(reminder => {
        if (reminder.enabled && reminder.status === 'scheduled') {
          const reminderTime = new Date(reminder.datetime);
          if (reminderTime <= now) {
            triggerAlarm(reminder);
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [reminders]);

  // Trigger alarm
  const triggerAlarm = (reminder) => {
    setActiveAlarm(reminder);

    // Show browser notification
    if (notificationsEnabled && 'Notification' in window) {
      new Notification('⏰ Alarm Triggered!', {
        body: `${reminder.title}\n${reminder.note || ''}`,
        icon: '⏰'
      });
    }

    // Play the chosen ringtone (loops until stopped)
    playRingtone(reminder.ringtone || 'classic', true);
  };

  // Add reminder
  const addReminder = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.datetime) return;

    const newReminder = {
      title: formData.title,
      note: formData.note,
      datetime: formData.datetime,
      status: 'scheduled',
      enabled: true,
      ringtone: formData.ringtone || 'classic'
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReminder)
      });
      const savedReminder = await response.json();
      setReminders([...reminders, savedReminder]);
      setFormData({ title: '', note: '', datetime: '', ringtone: 'classic' });
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  // Delete reminder
  const deleteReminder = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setReminders(reminders.filter(r => (r._id || r.id) !== id));
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  // Toggle reminder enable/disable
  const toggleReminder = async (id) => {
    const reminder = reminders.find(r => (r._id || r.id) === id);
    if (!reminder) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !reminder.enabled })
      });
      const updatedReminder = await response.json();
      setReminders(reminders.map(r => (r._id || r.id) === id ? updatedReminder : r));
    } catch (error) {
      console.error('Error toggling reminder:', error);
    }
  };

  // Start editing
  const startEdit = (reminder) => {
    setEditingId(reminder._id || reminder.id);
    setEditData({
      title: reminder.title,
      note: reminder.note,
      datetime: reminder.datetime
    });
  };

  // Save edit
  const saveEdit = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });
      const updatedReminder = await response.json();
      setReminders(reminders.map(r => (r._id || r.id) === id ? updatedReminder : r));
      setEditingId(null);
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ title: '', note: '', datetime: '' });
  };

  // Clear all reminders
  const clearAllReminders = async () => {
    if (window.confirm('Are you sure you want to clear all reminders?')) {
      // For now, we'll just delete them one by one or implement a bulk delete in backend
      // Since bulk delete isn't implemented, let's just clear local state for now or notify it's not implemented
      // Better to just delete them one by one for now to keep it consistent
      for (const reminder of reminders) {
        await deleteReminder(reminder._id || reminder.id);
      }
    }
  };

  // Mark alarm as done
  const markDone = async () => {
    if (activeAlarm) {
      const id = activeAlarm._id || activeAlarm.id;
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'completed', enabled: false })
        });
        const updatedReminder = await response.json();
        setReminders(reminders.map(r => (r._id || r.id) === id ? updatedReminder : r));
        setActiveAlarm(null);
      } catch (error) {
        console.error('Error marking as done:', error);
      }
    }
  };

  // Snooze alarm — reschedule 5 minutes from now
  const snoozeAlarm = async () => {
    if (activeAlarm) {
      stopRingtone();
      const id = activeAlarm._id || activeAlarm.id;
      const snoozeTime = new Date(Date.now() + 5 * 60 * 1000).toISOString();
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ datetime: snoozeTime, status: 'scheduled', enabled: true })
        });
        const updatedReminder = await response.json();
        setReminders(reminders.map(r => (r._id || r.id) === id ? updatedReminder : r));
        setActiveAlarm(null);
      } catch (error) {
        console.error('Error snoozing alarm:', error);
      }
    }
  };

  // Filter and sort reminders
  const filteredReminders = reminders
    .filter(r =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.note || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'soonest') {
        return new Date(a.datetime) - new Date(b.datetime);
      } else if (sortBy === 'latest') {
        return new Date(b.datetime) - new Date(a.datetime);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  return {
    // State
    reminders: filteredReminders,
    notificationsEnabled,
    searchQuery,
    sortBy,
    editingId,
    activeAlarm,
    formData,
    editData,
    loading,

    // Setters
    setSearchQuery,
    setSortBy,
    setFormData,
    setEditData,

    // Actions
    requestNotificationPermission,
    addReminder,
    deleteReminder,
    toggleReminder,
    startEdit,
    saveEdit,
    cancelEdit,
    clearAllReminders,
    markDone,
    snoozeAlarm
  };
};