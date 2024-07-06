// src/errors/HttpError.ts
export class HttpError extends Error {
  status: number;
  client?: string; // Optional property to specify the client/source of the error

  constructor(message: string, status: number, client?: string) {
    super(message);
    this.status = status;
    this.client = client;
  }
}
