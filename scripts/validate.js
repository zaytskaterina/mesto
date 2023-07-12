// скрыть ошибки при открытии попапа и тогл кнопки.
function setDefaultForm(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButton(inputList, button, config.inactiveButtonClass);
  inputList.forEach((input) => {
    hideInputError(form, input, config.inputErrorClass, config.errorClass);
  });
}

const showInputError = (
  form,
  input,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = form.querySelector(`.popup__error-${input.name}`);
  input.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (form, input, inputErrorClass, errorClass) => {
  const errorElement = form.querySelector(`.popup__error-${input.name}`);
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (form, input, inputErrorClass, errorClass) => {
  if (!input.validity.valid) {
    showInputError(
      form,
      input,
      input.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(form, input, inputErrorClass, errorClass);
  }
};

const hasInvalidInputs = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const toggleButton = (inputList, button, inactiveButtonClass) => {
  if (hasInvalidInputs(inputList)) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
};

const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputList.forEach((input) =>
    input.addEventListener("input", () => {
      toggleButton(inputList, button, config.inactiveButtonClass);
      checkInputValidity(
        form,
        input,
        config.inputErrorClass,
        config.errorClass
      );
    })
  );
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, config);
  });
};
