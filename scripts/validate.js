const showInputError = (
  form,
  inputElem,
  errorMsg,
  inputErrorClass,
  errorClass
) => {
  const errorElem = form.querySelector(`.popup__error-${inputElem.name}`);
  inputElem.classList.add(inputErrorClass);
  errorElem.classList.add(errorClass);
  errorElem.textContent = errorMsg;
};

const hideInputError = (form, inputElem, inputErrorClass, errorClass) => {
  const errorElem = form.querySelector(`.popup__error-${inputElem.name}`);
  inputElem.classList.remove(inputErrorClass);
  errorElem.classList.remove(errorClass);
  errorElem.textContent = "";
};

const checkInputValidity = (form, inputElem, inputErrorClass, errorClass) => {
  if (!inputElem.validity.valid) {
    showInputError(
      form,
      inputElem,
      inputElem.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(form, inputElem, inputErrorClass, errorClass);
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

const setEventListeners = (
  form,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);

  inputList.forEach((inputElem) =>
    inputElem.addEventListener("input", () => {
      toggleButton(inputList, button, inactiveButtonClass);
      checkInputValidity(form, inputElem, inputErrorClass, errorClass);
    })
  );
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(
      form,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
