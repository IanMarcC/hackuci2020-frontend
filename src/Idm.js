import Socket from "./Socket";
import { idmEPs, registerEPs } from "../Config.json";

const { loginEP } = idmEPs;
const { registerEP } = registerEPs;
async function login(email, password) {
  const payLoad = {
    email: email,
    password: password.split("")
  };  
  return await Socket.POST(loginEP, payLoad);
}
async function register(email, password) {
  const payLoad = {
    email: email,
    password: password.split("")
  };  
  return await Socket.POST(registerEP, payLoad);
}
export default {
  login,
  register
};