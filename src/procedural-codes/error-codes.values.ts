import { ErrorInterface } from '../abstractions';

class ErrorCode {
  public static INVALID_PARAMETERS: ErrorInterface = {
    data: {},
    result: 'ko',
    status: 400,
    error: 'Invalid parameters'
  };

  public static INTERNAL_ERROR: ErrorInterface = {
    data: {},
    result: 'ko',
    status: 500,
    error: 'Internal Server Error'
  };
}

export { ErrorCode };
