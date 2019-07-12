import { BaseContext } from "koa";
import { CustomError } from "../../models";
import { logger } from "../../services";
import { IResponse } from "../../typings";

export const setError = async (ctx: BaseContext, next: () => Promise<any>) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof CustomError) {
      const { status, error } = e;
      ctx.status = status;
      ctx.body = error;
    } else {
      const err = {} as IResponse;
      err.msg = "Error occured. Please try again later;";
      logger.error(e.message);

      ctx.status = 500;
      ctx.body = err;
    }
  }
};
