import React, { createRef, LegacyRef, useState } from "react";
import './index.scss';

const FileInput = () => {
    const fileRef: LegacyRef<HTMLInputElement> = createRef();
    const [fileName, setFileName] = useState("");
    const [fileLoad, setFileLoad] = useState(false);

    const fileChange = () => {
        const loadFileName = fileRef?.current?.value.split("\\").pop() || "";
        setFileLoad(true);
        setFileName(loadFileName);
    };

    const clickFakeButtonFile = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        fileRef.current?.click();
    };

    return (
        <>
            <input
                type="file"
                name="file"
                accept=".jpg,.jpeg,.png"
                ref={fileRef}
                onChange={fileChange}
            />
            <button
                className={fileLoad ? "file__fake active" : "file__fake"}
                onClick={clickFakeButtonFile}
            >
                <span className="file__name">{fileName}</span>
                <span className="button__text">Загрузить аватар</span>
            </button>
            <p className="file__info">
                только файлы с расширением <span>jpg,.jpeg,.png</span>
            </p>
        </>
    );
};

export default FileInput;
