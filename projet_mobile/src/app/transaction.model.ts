export interface Transaction {
    retiredAt: Date;
    type: string;
    montant: number;
    sendAt?: Date;
    frais?: number;
    partDepot?: number;
    partRetrait?: number
    partEtat?: number
    partSysteme?: number
  }