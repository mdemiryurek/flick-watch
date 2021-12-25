import { getPositionOfElement, scrollToTop } from "./helper";

export const validateForm = (inputs) => {
    let newInputs = {};
    for (const [key, input] of Object.entries(inputs)) {
        let result;
        switch(input.validateType) {
            case 'stringValidation':
                result = stringValidation(input.value);
                break;
            case 'emptyValidation':
                result = emptyValidation(input.value);
                break;
            case 'emailValidation':
                result = emailValidation(input.value, input.required);
                break;
            default:
                break;
        }

        newInputs = {...newInputs, [key]: createNewInput(input, result)}
    }

    return newInputs;
}

const createNewInput = (input, validate) => {
    input.validation = validate === null ? false : true;
    input.validateMessage = validate;

    return input;
}

const emptyValidation = (fieldValue) => {
    if (fieldValue.trim() === '') {
        return 'This field cannot be empty.';
    }
    return null;
}

const stringValidation = (fieldValue) => {
    if (fieldValue.trim() === '') {
        return 'This field cannot be empty.';
    }
    if (/[^a-zA-Z -]/.test(fieldValue)) {
        return 'Invalid value.';
    }
    if (fieldValue.trim().length < 3) {
        return 'This field needs at least 3 characters.';
    }
    return null;
}

const emailValidation = (fieldValue, isRequired) => {
    if (isRequired && fieldValue.trim() === '')
      return 'Please enter an email.';
    else if(fieldValue.trim() !== ''){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(String(fieldValue).toLowerCase()))
          return null;
      else
          return "Please enter a valid email."
    }
    return null;
}

export const scrollToMessage = () => {
    const errorLabels = document.getElementsByClassName("invalid-label");
    const windowOffset = window.pageYOffset;
    if(errorLabels.length > 0 && windowOffset > 0) {
        const positionOfLabel = getPositionOfElement(errorLabels[0].parentElement);
        scrollToTop(positionOfLabel);
    }
}

export const checkValidForm = (inputs) => {
    let valid = true;
    for (const [key, input] of Object.entries(inputs)) {
        if(input.validation) {
            valid = false;
            break;
        }
    }

    return valid;
}