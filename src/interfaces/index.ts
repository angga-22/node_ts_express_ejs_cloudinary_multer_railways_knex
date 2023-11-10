export interface JSONResponse {
  status: string;
  messages: string;
}

export interface Car {
  id?: number;
  name: string;
  imageUrl: string;
  rentPrice: number;
  startRent: Date;
  finishRent: Date;
  createdAt: Date;
  updatedAt: Date;
}
