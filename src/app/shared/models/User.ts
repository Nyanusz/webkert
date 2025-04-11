
import {Zenek} from './Zenek';

export interface User {
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  password: string;
  zenek: Zenek[];
  
}
