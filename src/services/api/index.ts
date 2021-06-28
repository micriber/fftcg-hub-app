import packageConfig from '../../../package.json';

interface IApiConfigure {
  token?: string;
  refreshCallback?: () => {};
  upgradeCallback?: () => void;
}

interface IRefreshWrapperOptions {
  json?: boolean;
}

export class Api {
  private static instance: Api;
  private token?: string;
  private refreshCallback?: () => {};
  private upgradeCallback?: () => void;

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

  public static configure({
    token,
    refreshCallback,
    upgradeCallback,
  }: IApiConfigure) {
    const api = Api.getInstance();

    if (token) {
      api.token = token;
    }

    if (refreshCallback) {
      api.refreshCallback = refreshCallback;
    }

    if (upgradeCallback) {
      api.upgradeCallback = upgradeCallback;
    }
  }

  private renderResponse(response: Response, json: boolean) {
    if (json) {
      return response.json();
    }

    return response.text();
  }

  public async refreshWrapper(
    callback: (token: string) => Promise<Response>,
    {json = true}: IRefreshWrapperOptions,
  ) {
    const res = await callback(this.token!);
    switch (res.status) {
      case 426:
        this.upgradeCallback && this.upgradeCallback();
        break;
      case 401:
        this.refreshCallback && (await this.refreshCallback());
        const resAfterRefresh = await callback(this.token!);
        return this.renderResponse(resAfterRefresh, json);
    }

    return this.renderResponse(res, json);
  }

  public async UpgradeWrapper(
    callback: () => Promise<Response>,
    {json = true}: IRefreshWrapperOptions,
  ) {
    const res = await callback();
    switch (res.status) {
      case 426:
        this.upgradeCallback && this.upgradeCallback();
        break;
    }

    return this.renderResponse(res, json);
  }

  public fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        'app-version': packageConfig.version,
      },
    });
  }
}
