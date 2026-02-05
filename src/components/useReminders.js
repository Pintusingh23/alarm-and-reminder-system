import { useState, useEffect } from 'react';

export const useReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('soonest');
  const [editingId, setEditingId] = useState(null);
  const [activeAlarm, setActiveAlarm] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    note: '',
    datetime: ''
  });

  // Edit form state
  const [editData, setEditData] = useState({
    title: '',
    note: '',
    datetime: ''
  });

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
        body: `${reminder.title}\n${reminder.note}`,
        icon: '⏰'
      });
    }

    // Play sound (optional)
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltryxnYpBSl+zPLaizsIGGS57OihUBALTKXh8bllHAU2j9Xyz4IvBSF1xPDglEILEl+z6+unVRQLRp/g8r5sIAYxiNDy04M0Bh5uwO/jmEgND1as5++wXRgIPpba8sZ2KQUpfszy2os7CBhkuezoiVAQC0yl4fG5ZRwFNo/R8s+CLwUhdcTw4JRCCxJfs+vrp1UUC0af4PK+bCAGMYjQ8tODNAYebrDv4phIDQ9WrODvsF0YCD6W2vLGdikFKX7M8tqLOwgYZLns6IlQEAtMpeHxuWUcBTaP0fLPgi8FIXXE8OCUQgsSX7Pr66dVFAtGn+DyvmwgBjGI0PLTgzQGHm6w7+KYSA0PVqzg77BdGAg+ltryx3YpBSl+zPLaizsIGGS57OiJUBALTKXh8bllHAU2j9Hyz4IvBSF1xPDglEILEl+z6+unVRQLRp/g8r5sIAYxiNDy04M0Bh5usO/imEgND1as4O+wXRgIPpba8sd2KQUpfszy2os7CBhkuezoiVAQC0yl4fG5ZRwFNo/R8s+CLwUhdcTw4JRCCxJfs+vrp1UUC0af4PK+bCAGMYjQ8tODNAYebrDv4phIDQ9WrODvsF0YCD6W2vLHdikFKX7M8tqLOwgYZLns6IlQEAtMpeHxuWUcBTaP0fLPgi8FIXXE8OCUQgsSX7Pr66dVFAtGn+DyvmwgBjGI0PLTgzQGHm6w7+KYSA0PVqzg77BdGAg+ltryx3YpBSl+zPLaizsIGGS57OiJUBALTKXh8bllHAU2j9Hyz4IvBSF1xPDglEILEl+z6+unVRQLRp/g8r5sIAYxiNDy04M0Bh5usO/imEgND1as4O+wXRgIPpba8sd2KQUpfszy2os7CBhkuezoiVAQC0yl4fG5ZRwFNo/R8s+CLwUhdcTw4JRCCxJfs+vrp1UUC0af4PK+bCAGMYjQ8tODNAYebrDv4phIDQ9WrODvsF0YCD6W2vLHdikFKX7M8tqLOwgYZLns6IlQEAtMpeHxuWUcBTaP0fLPgi8FIXXE8OCUQgsSX7Pr66dVFAtGn+DyvmwgBjGI0PLTgzQGHm6w7+KYA==');
      audio.play().catch(() => {});
    } catch (e) {}
  };

  // Add reminder
  const addReminder = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.datetime) return;

    const newReminder = {
      id: Date.now(),
      title: formData.title,
      note: formData.note,
      datetime: formData.datetime,
      status: 'scheduled',
      enabled: true,
      createdAt: new Date().toISOString()
    };

    setReminders([...reminders, newReminder]);
    setFormData({ title: '', note: '', datetime: '' });
  };

  // Delete reminder
  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  // Toggle reminder enable/disable
  const toggleReminder = (id) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  // Start editing
  const startEdit = (reminder) => {
    setEditingId(reminder.id);
    setEditData({
      title: reminder.title,
      note: reminder.note,
      datetime: reminder.datetime
    });
  };

  // Save edit
  const saveEdit = (id) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, ...editData } : r
    ));
    setEditingId(null);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ title: '', note: '', datetime: '' });
  };

  // Clear all reminders
  const clearAllReminders = () => {
    if (window.confirm('Are you sure you want to clear all reminders?')) {
      setReminders([]);
    }
  };

  // Snooze alarm
  const snoozeAlarm = () => {
    if (activeAlarm) {
      const newTime = new Date(activeAlarm.datetime);
      newTime.setMinutes(newTime.getMinutes() + 5);
      
      setReminders(reminders.map(r => 
        r.id === activeAlarm.id 
          ? { ...r, datetime: newTime.toISOString().slice(0, 16), status: 'scheduled' }
          : r
      ));
      setActiveAlarm(null);
    }
  };

  // Mark alarm as done
  const markDone = () => {
    if (activeAlarm) {
      setReminders(reminders.map(r => 
        r.id === activeAlarm.id 
          ? { ...r, status: 'completed', enabled: false }
          : r
      ));
      setActiveAlarm(null);
    }
  };

  // Filter and sort reminders
  const filteredReminders = reminders
    .filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.note.toLowerCase().includes(searchQuery.toLowerCase())
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
    snoozeAlarm,
    markDone
  };
};