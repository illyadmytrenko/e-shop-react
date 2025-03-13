import { router } from "@/app/router";

export const extraArgument = {
  router: undefined as unknown,
};

export const setRouter = (routerInstance: typeof router) => {
  extraArgument.router = routerInstance;
};
