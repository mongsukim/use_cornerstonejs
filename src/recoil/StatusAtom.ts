import { atom } from 'recoil';

export const imgIdState = atom<string[]>({
  key: 'imgIdStateKey',
  default: [],
});

//윈도잉 상태
export const windowingActiveState = atom({
  key: 'windowingActiveState',
  default: false,
});

//zoom/pan 상태
export const zoomActiveState = atom({
  key: 'zoomActiveState',
  default: false,
});

// measurement 상태
export const measurementState = atom({
  key: 'measureState',
  default: false,
});
