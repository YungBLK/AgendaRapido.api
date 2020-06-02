import {UserController} from "./controller/UserController";
import { CostumerController } from "./controller/CostumerController";

export const Routes = [
   {method: "get",route: "/users",controller: UserController,action: "all"},
   {method: "get",route: "/users/:id",controller: UserController,action: "one"},
   {method: "post",route: "/users",controller: UserController,action: "save"},
   {method: "post",route: "/users/create",controller: UserController,action: "createUser"},
   {method: "post",route: "/users/auth",controller: UserController,action: "auth"},
   {method: "delete",route: "/users/:id",controller: UserController,action: "remove"},

   {method: "get",route: "/costumer",controller: CostumerController,action: "all"},
   {method: "get",route: "/costumer/:id",controller: CostumerController,action: "one"},
   {method: "post",route: "/costumer",controller: CostumerController,action: "save"},
   {method: "post",route: "/costumer/create",controller: CostumerController,action: "createCostumer"},
   {method: "delete",route: "/costumer/:id",controller: CostumerController,action: "remove"}

];