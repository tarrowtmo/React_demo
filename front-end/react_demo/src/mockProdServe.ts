import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import userMock from '../mock/user';
import listMock from '../mock/list';

export const setupProdMockServer = () => {
  createProdMockServer([...userMock, ...listMock]);
};