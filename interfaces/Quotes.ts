export interface Quote {
  id: number;
  texto: string;
  autor: string;
  fecha: Date;
}



export interface QuoteRequest {
  q: string; 
  a: string; 
}
