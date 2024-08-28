import { atom } from 'recoil';

export const selectedDeepCatchType = atom<boolean>({
  key: 'selectedDeepCatchTypeState',
  default: false,
});