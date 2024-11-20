import { ReactNode } from "react";
import InputSelect from "./Input/InputSelect";
import InputText from "./Input/InputText";

interface InputProps {
    type: string;
    inputName?: string;
    placeholder?: string;
    error?: string;
    dropdownOptions?: string[];
    register?: unknown;
    setValue?: unknown;
    value?: string | number;
    max?: number;
    startSlot?: string | ReactNode;
    endSlot?: string | ReactNode;
    disabled?: boolean;
    autocomplete?: boolean;
}


export default function Input({ 
    type, 
    inputName = "Input", 
    placeholder = "text", 
    error,
    dropdownOptions = ["hello", "world"],
    register, 
    max,
    startSlot,
    endSlot,
    setValue,
    value,
    disabled,
    autocomplete,
}: InputProps) {
    if (type === "select") {
        return <InputSelect
            inputName={inputName}
            dropdownData={dropdownOptions}
            register={register}
            setValue={setValue}
            value={value}
        />
    }

    return <InputText
        type={type}
        inputName={inputName}
        placeholder={placeholder}
        error={error}
        register={register}
        max={max}
        startSlot={startSlot}
        endSlot={endSlot} 
        value={value}
        disabled={disabled}
        autocomplete={autocomplete}
    />
}