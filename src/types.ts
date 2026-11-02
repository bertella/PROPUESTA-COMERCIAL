export type DocumentTheme = 'executive' | 'minimal' | 'navy';

export interface ProposalConfig {
  recipientName: string;
  recipientCompany?: string;
  issueDate: string;
  validityDays: string;
  referenceCode: string;
  advisorName: string;
  advisorTitle: string;
  advisorPhone: string;
  advisorEmail: string;
  advisorLicense: string; // Matrícula CPI
  includeSignatures: boolean;
  includeComparisonBar: boolean;
  notes?: string;
  theme: DocumentTheme;
}

export interface Modalidad {
  id: string;
  number: string;
  name: string;
  badge?: string;
  totalPrice: number;
  initialPayment?: number;
  financedAmount?: number;
  termMonths?: number;
  monthlyPayment?: number;
  description?: string;
  highlight?: boolean;
}
