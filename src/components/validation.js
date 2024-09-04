import { validationConfig } from "../index.js";

// Сообщения об ошибке.

const showValidationError = (formSelector, inputSelector, errorMessage) => {
  const errorUnit = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(validationConfig.inputErrorClass);
  errorUnit.classList.add(validationConfig.errorClass);
  errorUnit.textContent = errorMessage;
};

const hideValidationError = (formSelector, inputSelector) => {
  const errorUnit = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(validationConfig.inputErrorClass);
  errorUnit.classList.remove(validationConfig.errorClass);
  errorUnit.textContent = "";
};

// Применение валидации к полям ввода и кнопкам.

export const enableValidation = () => {
  const formUnit = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formUnit.forEach((formSelector) => {
    formSelector.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetUnit = Array.from(
      formSelector.querySelectorAll(".form__set")
    );

    fieldsetUnit.forEach((fieldset) => {
      placeEventListeners(fieldset);
    });
  });
};

const invalidInputError = (inputUnits) => {
  return inputUnits.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
};

const saveButtonStatus = (inputUnits, submitButtonSelector) => {
  if (invalidInputError(inputUnits)) {
    submitButtonSelector.disabled = true;
    submitButtonSelector.classList.add(validationConfig.inactiveButtonClass);
  } else {
    submitButtonSelector.disabled = false;
    submitButtonSelector.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Отмена валидации.

export function disableValidation(formSelector, validationConfig) {
  const inputSelector = Array.from(
    formSelector.querySelectorAll(validationConfig.inputSelector)
  );
  inputSelector.forEach((inputSelector) => {
    const errorUnit = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(validationConfig.inputErrorClass);
    errorUnit.classList.remove(validationConfig.errorClass);
    errorUnit.textContent = "";
  });

  const submitButton = formSelector.querySelector(
    validationConfig.submitButtonSelector
  );
  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.disabled = true;
}

// Проверка поля на валидность + слушатель для формы.

const inputValidationCheckup = (formSelector, inputSelector) => {
  if (inputSelector.validity.patternMismatch) {
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
  } else {
    inputSelector.setCustomValidity("");
  }

  if (!inputSelector.validity.valid) {
    showValidationError(
      formSelector,
      inputSelector,
      inputSelector.validationMessage
    );
  } else {
    hideValidationError(formSelector, inputSelector);
  }
};

const placeEventListeners = (formSelector) => {
  const inputUnits = Array.from(
    formSelector.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButtonSelector = formSelector.querySelector(
    validationConfig.submitButtonSelector
  );
  saveButtonStatus(inputUnits, submitButtonSelector);
  inputUnits.forEach((inputSelector) => {
    inputSelector.addEventListener("input", function () {
      inputValidationCheckup(formSelector, inputSelector);
      saveButtonStatus(inputUnits, submitButtonSelector);
    });
  });
};
