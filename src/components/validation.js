// Сообщения об ошибке.

const showValidationError = (
  formSelector,
  inputSelector,
  errorMessage,
  validationConfig
) => {
  const errorUnit = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(validationConfig.inputErrorClass);
  errorUnit.classList.add(validationConfig.errorClass);
  errorUnit.textContent = errorMessage;
};

const hideValidationError = (formSelector, inputSelector, validationConfig) => {
  const errorUnit = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(validationConfig.inputErrorClass);
  errorUnit.classList.remove(validationConfig.errorClass);
  errorUnit.textContent = "";
};

// Применение валидации к полям ввода и кнопкам.

export const enableValidation = (validationConfig) => {
  const formUnit = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formUnit.forEach((formSelector) => {
    placeEventListeners(formSelector, validationConfig);
  });
};

const invalidInputError = (inputUnits) => {
  return inputUnits.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
};

const disableSaveButton = (button, inactivateClass) => {
  button.classList.remove(inactivateClass);
  button.disabled = false;
};

const saveButtonStatus = (
  inputUnits,
  submitButtonSelector,
  validationConfig
) => {
  if (invalidInputError(inputUnits)) {
    submitButtonSelector.classList.add(validationConfig.inactiveButtonClass);
    submitButtonSelector.disabled = true;
  } else {
    disableSaveButton(
      submitButtonSelector,
      validationConfig.inactiveButtonClass
    );
  }
};

// Отмена валидации.

export const disableValidation = (formSelector, validationConfig) => {
  const inputSelector = Array.from(
    formSelector.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formSelector.querySelector(
    validationConfig.submitButtonSelector
  );

  inputSelector.forEach((inputSelector) => {
    hideValidationError(formSelector, inputSelector, validationConfig);
    inputSelector.setCustomValidity("");
  });

  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.disabled = true;
};

// Проверка поля на валидность + слушатель для формы.

const inputValidationCheckup = (
  formSelector,
  inputSelector,
  validationConfig
) => {
  if (inputSelector.validity.patternMismatch) {
    showValidationError(
      formSelector,
      inputSelector,
      inputSelector.dataset.errorMessage,
      validationConfig
    );
  } else if (!inputSelector.validity.valid) {
    showValidationError(
      formSelector,
      inputSelector,
      inputSelector.validationMessage,
      validationConfig
    );
  } else {
    hideValidationError(formSelector, inputSelector, validationConfig);
  }
};

const placeEventListeners = (formSelector, validationConfig) => {
  const inputUnits = Array.from(
    formSelector.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButtonSelector = formSelector.querySelector(
    validationConfig.submitButtonSelector
  );

  saveButtonStatus(inputUnits, submitButtonSelector, validationConfig);
  inputUnits.forEach((inputSelector) => {
    inputSelector.addEventListener("input", function () {
      inputValidationCheckup(formSelector, inputSelector, validationConfig);
      saveButtonStatus(inputUnits, submitButtonSelector, validationConfig);
    });
  });
};
