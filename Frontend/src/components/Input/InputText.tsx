import { useState, useEffect, KeyboardEvent, ChangeEvent, ReactNode } from "react";
import InputSlot from "./extras/InputSlot";
import inputUtils from "../../utils/inputUtils";
import InputEye from "./extras/InputEye";

interface InputProps {
    type: string;
    inputName?: string;
    placeholder: string;
    error?: string;
    dropdownOptions?: string[];
    register?: unknown;
    setValue?: unknown;
    max?: number;
    startSlot?: string | ReactNode;
    endSlot?: string | ReactNode;
    value?: string | number;
    disabled?: boolean;
    autocomplete?: boolean;
}


export default function InputText({ 
    type, 
    inputName, 
    placeholder, 
    error, 
    register, 
    max,
    startSlot,
    endSlot,
    value,
    disabled,
    autocomplete,
}: InputProps) {
    const [inputLength, setInputLength] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        console.log(value, "value");
    }, [])

    useEffect(() => {
        setInputLength(value?.toString().length || 0);
    }, [value])

    return (
        <div className="flex flex-col gap-0.5">
            {
                inputName && (
                    <label 
                        htmlFor={inputName} 
                        className="
                            text-base font-semibold ml-2 bg-clip-text text-transparent
                            bg-gradient-to-tr from-[#C29469] via-[#ccc5c3] to-[#C29469]
                        "
                    >
                        {inputName.charAt(0).toUpperCase() + inputName.slice(1)}
                    </label>
                )
            }

            <div 
                className={`
                    w-full h-min p-0.5 flex gap-0.5 ${type === "textarea" ? "rounded-lg" : "rounded-full"}
                    bg-gradient-to-tr dark:from-[#C29469] dark:via-[#ccc5c3] dark:to-[#C29469] from-[#3b2d2b] via-[#66564c] to-[#3b2d2b]
                `}
            >
                {
                    startSlot && <InputSlot side="end">{startSlot}</InputSlot>
                }
                <div 
                    className={`
                        grow h-full overflow-hidden flex
                        dark:bg-[#3b2d2b] dark:hover:bg-[#66564c] hover:bg-[#F2CEA9] bg-[#EFD8BF] 
                        ${type === "textarea" ? endSlot ? "rounded-l-md" : "rounded-md" : endSlot ? "rounded-l-full" : type === "password" ? "rounded-l-full" : "rounded-full"}
                    `}
                >
                    {
                        inputUtils.handleType(type, visible) === "textarea" ?
                        <textarea
                            name={inputName}
                            placeholder={placeholder}
                            {...register}
                            onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => inputUtils.handleInputKeyDown(event, type)}
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => inputUtils.handleInputChange(event, type, setInputLength)}
                            className="
                                grow h-80 bg-transparent py-2 px-4 dark:text-white appearance-none outline-none resize-none
                            "
                            maxLength={max}
                            disabled={disabled}
                        />
                        :
                        <input 
                            type={inputUtils.handleType(type, visible)}
                            name={inputName}
                            placeholder={placeholder}
                            {...register}
                            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => inputUtils.handleInputKeyDown(event, type)}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => inputUtils.handleInputChange(event, type, setInputLength)}
                            step={0.01}
                            defaultValue={value}
                            className="
                                grow h-full bg-transparent py-2 px-4 dark:text-white appearance-none outline-none
                            "
                            maxLength={max}
                            autoComplete={autocomplete ? "on" : "off"}
                            disabled={disabled}
                        />
                    }
                    {max && <div className="w-min h-full flex items-center px-2 pt-4 text-sm dark:text-slate-300">
                          <span>{inputLength}/{max}</span>
                    </div>}
                </div>
                {
                    type === "password" && <InputEye visibility={visible} onClick={() => setVisible(!visible)} />
                }
                {
                    endSlot && <InputSlot side="end">{endSlot}</InputSlot>
                }
            </div>
            {error ? <p className="text-red-500 text-sm mt-1 ml-2">{error}</p> : <p className="w-full h-6"></p>}
        </div>
    )
}