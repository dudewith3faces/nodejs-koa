import { BaseContext } from 'koa';
import { IResponse } from '../../interface';
import { HTTPError } from '../../models';

export const setError = async (ctx: BaseContext, next: () => Promise<any>) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof HTTPError) {
      const { status, error } = e;
      ctx.status = status;
      ctx.body = error;
    } else {
      const err = {} as IResponse;
      err.msg = 'Error occured. Please try again later;';

      ctx.app.emit('err', e);

      ctx.status = 500;
      ctx.body = err;
    }
  }
};
