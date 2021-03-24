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

  export interface DepotRetraitTransaction {
    id: null,
    code: "",
    montant: null,
    sendFrom: {
      id: null,
      firstName: "",
      lastName: "",
      telephone: "",
      IdCard: ""
    },
    sendTo: {
      id: null,
      firstName: "",
      lastName: "",
      telephone: "",
      IdCard: ""
    }
  }