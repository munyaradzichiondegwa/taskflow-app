export const STORAGE = {
  USERS: 'tf_users_v1',
  TASKS: 'tf_tasks_v1',
  SESSION: 'tf_session_v1'
};

export const load = (key) => JSON.parse(localStorage.getItem(key) || 'null');
export const save = (key, val) => localStorage.setItem(key, JSON.stringify(val));
