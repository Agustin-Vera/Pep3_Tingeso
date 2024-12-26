import axios from "axios";

const mortgageLoanBackendServer = import.meta.env
  .VITE_MORTGAGELOAN_BACKEND_SERVER;
const mortgageLoanBackendPort = import.meta.env.VITE_MORTGAGELOAN_BACKEND_PORT;
console.log(mortgageLoanBackendServer);

export default axios.create({
  baseURL: `http://${mortgageLoanBackendServer}:${mortgageLoanBackendPort}`,
  headers: {
    "Content-Type": "application/json",
  },
});
