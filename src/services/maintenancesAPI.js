import tellcromService from "./tellcromAPI";

const maintenanceService = {};

maintenanceService.list = function() {
  return tellcromService.get("/maintenances/").then(res => res.data);
};
maintenanceService.get = function(id) {
  return tellcromService.get(`/maintenances/${id}/`).then(res => res.data);
};

export default maintenanceService;
