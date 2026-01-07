// ============================================
// 2. INTERFACE DE DOMINIO
// ============================================
export interface Colombia {
  id: number;
  name: string;
  description: string;
  capital: string;
  surface: number;
  population: number;
  languages: string[];
  timeZone: string;
  currency: string;
  currencyCode: string;
  currencySymbol: string;
  region: string;
  borders: string[];
  flags: string[];
}