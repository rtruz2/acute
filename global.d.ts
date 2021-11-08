type Task = {
  id: any;
  task: string;
  department: string;
  startDate: Date;
  endDate: Date;
  owner: string;
  isActive: boolean;
};

interface Department {
  id:string,
  name: string
}