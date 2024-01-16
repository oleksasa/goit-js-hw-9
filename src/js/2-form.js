const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

function saveFormDataToLocalStorage(formData) {
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

function restoreDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem(localStorageKey)) || {};
}

const savedFormData = restoreDataFromLocalStorage();

const formattedFormData = {
  email: (savedFormData.email || '').trim(),
  message: (savedFormData.message || '').trim(),
};

form.elements.email.value = formattedFormData.email;
form.elements.message.value = formattedFormData.message;

const handleInput = event => {
  formattedFormData[event.target.name] = event.target.value.trim();

  saveFormDataToLocalStorage(formattedFormData);
};

const handleSubmit = event => {
  event.preventDefault();
  let isEmptyField = false;

  for (const key in formattedFormData) {
    if (
      formattedFormData.hasOwnProperty(key) &&
      formattedFormData[key] === ''
    ) {
      isEmptyField = true;
      break;
    }
  }

  if (isEmptyField) {
    alert('Please fill in all fields');
    return;
  }

  console.log({
    email: form.elements.email.value,
    message: form.elements.message.value,
  });

  localStorage.removeItem(localStorageKey);
  form.reset();

  formattedFormData.email = '';
  formattedFormData.message = '';
};

form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);
