export interface DatasetTabModel {
  id: number;
  step: string;
  title: string;
  description: string;
  status: string;
  isActive: boolean;
}

export interface WizardDataset {
  name: string;
  schema: {
    domainName: string;
    sections: string[];
    countries: string[];
    industries: string[];
  };
  status: string;
}