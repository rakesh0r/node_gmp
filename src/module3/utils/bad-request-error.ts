
export class BadRequestError extends Error {  
    status;
    
    constructor (status: number, message: string) {
      super(message);
  
      this.status = status;
      // assign the error class name in your custom error (as a shortcut)
      this.name = this.constructor.name
  
      // capturing the stack trace keeps the reference to your error class
      Error.captureStackTrace(this, this.constructor);
    }
}