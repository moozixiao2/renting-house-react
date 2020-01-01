import axios from 'axios'
import { baseURL } from './url'

let instance = axios.create({
    baseURL
  });

export default instance