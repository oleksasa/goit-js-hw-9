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
  email: savedFormData.email || '',
  message: savedFormData.message || '',
};

form.elements.email.value = formattedFormData.email;
form.elements.message.value = formattedFormData.message;

const handleInput = (event) => {
  formattedFormData[event.target.name] = event.target.value.trim()

  saveFormDataToLocalStorage(formattedFormData);
}

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(formattedFormData, 'before condition')
  const areTextFieldsFilled = Object.values(formattedFormData).every(value => value !== '');

  if(!areTextFieldsFilled){
    alert('All form fields must be filled in');
    return;
  }

  console.log({
    email: form.elements.email.value,
    message: form.elements.message.value,
  });

  localStorage.removeItem(localStorageKey);
  form.reset();
}

form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);