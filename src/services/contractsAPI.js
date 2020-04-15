import tellcromService from "./tellcromAPI";

const contractsService = {};

contractsService.list = function() {
  return tellcromService.get("/contracts/").then(res => res.data);
};
contractsService.get = function(id) {
  return tellcromService.get(`/contracts/${id}/`).then(res => res.data);
};
contractsService.list_maintenances = function(id) {
  return tellcromService
    .get(`/contracts/${id}/list_maintenances/`)
    .then(res => res.data);
};
contractsService.list_request = function(id) {
  return tellcromService.get(`/contracts/${id}/list_request/`).then(res => {
    return res.data;
  });
};

export default contractsService;
