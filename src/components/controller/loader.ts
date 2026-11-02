export interface ILoaderOptions {
  [key: string]: string | number | boolean;
}

export interface IGetRespParams {
  endpoint: string;
  options?: ILoaderOptions;
}

type Callback<T> = (data: T) => void;

class Loader {
  private baseLink: string;
  private options: ILoaderOptions;

  constructor(baseLink: string, options: ILoaderOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp<T>(
    { endpoint, options = {} }: IGetRespParams,
    callback: Callback<T> = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load<T>('GET', endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }
    return res;
  }

  private makeUrl(options: ILoaderOptions, endpoint: string): string {
    const urlOptions: ILoaderOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load<T>(
    method: string,
    endpoint: string,
    callback: Callback<T>,
    options: ILoaderOptions = {}
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json() as Promise<T>) // Говорим, что json вернет тип T
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
