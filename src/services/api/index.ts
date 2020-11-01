interface IApiConfigure {
  token?: string;
  refreshCallback?: () => {};
}

interface IRefreshWrapperOptions {
  json?: boolean;
}

export class Api {
  private static instance: Api;
  private token?: string;
  private refreshCallback?: () => {};

  static set Token(newToken: string | undefined) {
    const api = Api.getInstance();
    api.token = newToken;
  }

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }

    return Api.instance;
  }

  public static configure({token, refreshCallback}: IApiConfigure) {
    const api = Api.getInstance();

    if (token) {
      api.token = token;
    }

    if (refreshCallback) {
      api.refreshCallback = refreshCallback;
    }
  }

  private renderResponse(response: Response, json: boolean) {
    if (json) {
      return response.json();
    }

    return response;
  }

  public async refreshWrapper(
    callback: (token: string) => Promise<Response>,
    {json = true}: IRefreshWrapperOptions,
  ) {
    const res = await callback(this.token!);

    if (res.status === 401) {
      this.refreshCallback && (await this.refreshCallback());
      const resAfterRefresh = await callback(this.token!);

      return this.renderResponse(resAfterRefresh, json);
    }

    return this.renderResponse(res, json);
  }
}
