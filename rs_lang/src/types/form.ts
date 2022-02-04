export type TFormSubmitFC = (event: React.FormEvent<HTMLFormElement>) => void;

export interface IInputsObjInfo {
    name: string;
    type: string;
    placeholder: string;
    label?: boolean;
    classNameLabel?: string;
}

export interface FormProps {
    submitFunction: TFormSubmitFC;
    submitBtnText: string;
    fieldsForm: Array<IInputsObjInfo>;
    nameClass?: string;
    children?: JSX.Element;
    needFileButton?: boolean;

}

export interface FormInfoProps {
    text: string;
    pageLink: string;
    textPageLink: string;
    nameClass?: string;
}
