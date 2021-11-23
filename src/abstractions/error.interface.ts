interface ErrorInterface {
  data: {};
  error: string;
  status: 400 | 500 | number;
  result: 'ko' | 'ok' | string;
}

interface HTTPErrorInterface extends Error {
  status?: number;
  statusCode?: number;
  error: ErrorInterface | string;
}

export { ErrorInterface, HTTPErrorInterface };
