export interface Task {
  id: number;
  contractNumber: string;
  name: string;
  status: 'new' | 'done' | 'escalated';
  birthdate: string;
  sex: string;
  address: string;
}

const tasks: Task[] = [
  {
    id: 1,
    contractNumber: 'CN-102394',
    name: 'Anna Schmidt',
    status: 'new',
    birthdate: '',
    sex: 'female',
    address: 'Rosenstraße 12, 80331 München',
  },
  {
    id: 2,
    contractNumber: 'CN-102395',
    name: 'Lukas Weber',
    status: 'done',
    birthdate: '1989-07-22',
    sex: 'male',
    address: 'Berliner Allee 45, 40212 Düsseldorf',
  },
  {
    id: 3,
    contractNumber: 'CN-102396',
    name: 'Sofia Keller',
    status: 'escalated',
    birthdate: '1995-03-15',
    sex: 'female',
    address: 'Marktplatz 9, 90403 Nürnberg',
  },
  {
    id: 4,
    contractNumber: 'CN-102397',
    name: 'Jonas Fischer',
    status: 'new',
    birthdate: '',
    sex: 'male',
    address: 'Kaiserstraße 100, 60329 Frankfurt am Main',
  },
  {
    id: 5,
    contractNumber: 'CN-102398',
    name: 'Mia Hoffmann',
    status: 'new',
    birthdate: '',
    sex: 'female',
    address: 'Bachstraße 3, 70173 Stuttgart',
  },
  {
    id: 6,
    contractNumber: 'CN-102399',
    name: 'Felix Braun',
    status: 'done',
    birthdate: '1978-09-11',
    sex: 'male',
    address: 'Königsallee 10, 40212 Düsseldorf',
  },
  {
    id: 7,
    contractNumber: 'CN-102400',
    name: 'Nora Wagner',
    status: 'new',
    birthdate: '',
    sex: 'female',
    address: 'Domplatz 4, 50667 Köln',
  },
  {
    id: 8,
    contractNumber: 'CN-102401',
    name: 'Markus Lehmann',
    status: 'escalated',
    birthdate: '1982-12-30',
    sex: 'male',
    address: 'Schillerstraße 19, 80336 München',
  },
  {
    id: 9,
    contractNumber: 'CN-102402',
    name: 'Clara Meier',
    status: 'done',
    birthdate: '1993-05-10',
    sex: 'female',
    address: 'Altstadt 6, 20095 Hamburg',
  },
  {
    id: 10,
    contractNumber: 'CN-102403',
    name: 'David Becker',
    status: 'new',
    birthdate: '',
    sex: 'male',
    address: 'Lindenweg 7, 90402 Nürnberg',
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTasks = async (): Promise<Task[]> => {
  await delay(500);
  return [...tasks];
};

export const updateTask = async ({
  id,
  data,
}: {
  id: number;
  data: Partial<Task>;
}): Promise<Task> => {
  await delay(500);
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new Error('Task not found!');
  }
  if (task) Object.assign(task, data);
  return task;
};
