import { KeyboardEvent, ChangeEvent } from "react";

// ^ Makes sure input is only a number input
const onlyNumberInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if(isNaN(Number(event.key)) && event.key !== 'Backspace' && event.key !== '.') {
        event.preventDefault();
    }
}


const inputUtils = {
    // ^ Checks Input type and if needed replaces it.
    handleType: (type: string, visibility: boolean) => {
        if (type.toLowerCase() === "number") {
            return 'text';
        }

        if (type.toLowerCase() === "password" && visibility) {
            return 'text';
        }

        return type;
    },
    
    // ^ Runs a function on keyboard key click.
    handleInputKeyDown: (event: KeyboardEvent<HTMLInputElement>, type: string) => {
        switch (type) {
            case 'number':
            case 'unit':
                onlyNumberInput(event);
                break;

            default:
                break;
        }
    },

    // ^ Handles input change to track the length of the input value
    handleInputChange: (event: ChangeEvent<HTMLInputElement>,type: string, setInputLength: (length: number) => void) => {
        switch (type) {
            default:
                return setInputLength(event.target.value.length);
        }
    },
}

export default inputUtils;