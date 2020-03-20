import tellcromService from "./tellcromAPI";

const contractsService = {};

contractsService.list = function() {
    return tellcromService.get("/contracts/").then(res => res.data);
};

export default contractsService;
