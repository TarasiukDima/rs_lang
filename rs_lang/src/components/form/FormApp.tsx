import React from "react";
import { FormProps } from "../../types/form";
import FileInput from "./FIleInput";
import "./index.scss";

const FormApp = ({
    nameClass = "",
    submitFunction,
    submitBtnText,
    fieldsForm,
    children,
    needFileButton,
}: FormProps) => {
    const classesText = nameClass ? "form " + nameClass : "form";

    return (
        <form
            className={classesText}
            onSubmit={(event) => submitFunction(event)}
        >
            {fieldsForm.map(
                ({ name, type, placeholder, label, classNameLabel }) => {
                    const inputEl = (
                        <input
                            key={name}
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            required
                        />
                    );

                    if (label) {
                        return (
                            <label key={name} className={classNameLabel}>
                                {inputEl}
                            </label>
                        );
                    }
                    return inputEl;
                }
            )}

            {children}

            {needFileButton ? <FileInput /> : null}

            <input type="submit" value={submitBtnText} />
        </form>
    );
};

export default FormApp;
