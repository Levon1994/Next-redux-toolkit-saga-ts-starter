import { Error } from '@/store/root.types';

export interface IErrorReq {
  error: Error;
}

export enum PaletteTypesEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export type Palette = PaletteTypesEnum | null;

export interface ISystemBranchState {
  palette: Palette;
}
