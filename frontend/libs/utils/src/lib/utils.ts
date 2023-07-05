import { FormControl } from '@angular/forms';

export type FormDataType<T> = {
  [Property in keyof T]: FormControl<T[Property]>;
};


export const API_URL = 'http://localhost:1338/'