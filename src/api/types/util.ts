import { IResponseGetUserData } from "./user";

export interface IIconField {
    type: number;
    accessIcon: string | any;
}

export interface IProfile {
  data: IResponseGetUserData | null | undefined;
  changeView: () => void;
}