import { supabase } from '@/lib/supabase.ts';

export interface Task {
  id: number;
  contractNumber: string;
  name: string;
  status: 'new' | 'done' | 'escalated';
  birthdate: string;
  sex: string;
  address: string;
}

type TaskRow = {
  id: number;
  contract_number: string;
  name: string;
  status: Task['status'];
  birthdate: string | null;
  sex: string | null;
  address: string | null;
};

export const getTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase.from('tasks').select('*').order('id');
  if (error) throw error;
  return (data as TaskRow[]).map((row) => ({
    id: row.id,
    contractNumber: row.contract_number,
    name: row.name,
    status: row.status,
    birthdate: row.birthdate ?? '',
    sex: row.sex ?? '',
    address: row.address ?? '',
  }));
};

const ifDefined = <T>(value: T | undefined, key: string) =>
  value === undefined ? {} : { [key]: value };

export const updateTask = async ({
  id,
  data,
}: {
  id: number;
  data: Partial<Task>;
}): Promise<Task> => {
  const updates = {
    ...ifDefined(data.contractNumber, 'contract_number'),
    ...ifDefined(data.name, 'name'),
    ...ifDefined(data.status, 'status'),
    ...ifDefined(data.birthdate === '' ? null : data.birthdate, 'birthdate'),
    ...ifDefined(data.sex, 'sex'),
    ...ifDefined(data.address, 'address'),
  };
  const { data: row, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;

  return {
    id: row.id,
    contractNumber: row.contract_number,
    name: row.name,
    address: row.address ?? '',
    status: row.status,
    sex: row.sex ?? '',
    birthdate: row.birthdate ?? '',
  };
};

export const createTask = async (data: Omit<Task, 'id'>): Promise<Task> => {
  const { data: row, error } = await supabase
    .from('tasks')
    .insert({
      contract_number: data.contractNumber,
      name: data.name,
      status: data.status,
      birthdate: data.birthdate || null,
      sex: data.sex || null,
      address: data.address || null,
    })
    .select()
    .single();
  if (error) throw error;

  return {
    id: row.id,
    contractNumber: row.contract_number,
    name: row.name,
    address: row.address ?? '',
    status: row.status,
    sex: row.sex ?? '',
    birthdate: row.birthdate ?? '',
  };
};
