import auth from "./authentication";
import roles from "./rolesSlice";
import organisationReducer from "./organizationSlice";
import clustersReducer from "./clusterSlice"
import branchesSlice from "./branchesSlice"
const rootReducer = {
  auth,
  roles,
  organisation: organisationReducer,
  clusters: clustersReducer,
  branches: branchesSlice

};

export default rootReducer;