import { IResponseGetUserData } from "./user";

export interface IIconField {
    type: number;
    accessIcon: string | any;
}

export interface IResponsiveLine {
    id: string;
    data: {
        x: string;
        y: number;
      }[]
}

export interface ILineColors {
    [key: string]: string;
}

export interface IProfile {
    data: IResponseGetUserData | null | undefined;
    changeView: () => void;
}
