export interface IAddInspectionDialog {
  trigger: React.ReactNode | null; // Usando React.ReactNode para suportar elementos JSX
  title: string;
  content: string; // Mudado para 'string', já que 'content' parece ser um texto
  type: string; // O tipo pode ser uma string simples, mas você pode melhorar com tipos específicos se necessário
  handleAction: (arg0: unknown) => void; // O tipo de 'arg0' pode ser ajustado conforme necessário, dependendo da função
  setGrade: (arg0: string) => void; // Mudado para 'string', pois 'grade' parece ser uma string no componente
  setCriticalFlag: (arg0: string) => void; // 'CriticalFlag' é uma string
  formData: IRestaurant; // Supondo que 'IRestaurant' seja uma interface definida em outro lugar no código
}
