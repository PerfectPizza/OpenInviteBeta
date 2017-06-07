// the state of the application is serialized and deserialzed with JSON
// loadState is called on app load in index.js
// saveState is called on any change to application state with a .subscribe() call

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('OpenInviteBetaStore');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('error reading application state from localStorage', err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('OpenInviteBetaStore', serializedState);
  } catch (err) {
    console.error('error storing application state to localStorage', err);
  }
};

