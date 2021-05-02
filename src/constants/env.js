// Envs
let dev = false;
let devserver = "http://192.168.1.152:8084/";
let deploy = "http://35.224.42.25:8084/";

let env = {
  server:dev?devserver:deploy,
  dev:dev
};

export default env;