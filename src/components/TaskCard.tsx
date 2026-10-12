import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { birthdateSchema, type BirthdateFormValues } from "@/schemas/taskSchema.ts";
import { Button } from './ui/button.tsx';
import { type Task, updateTask } from '../api/tasks.ts';
import { Input } from './ui/input.tsx';
import { Label } from './ui/label.tsx';

export default function TaskCard({
  task,
  tasks,
}: {
  task: Task;
  tasks: Task[];
}) {
  const {
    register,
      handleSubmit,
      formState: { errors, isSubmitting },
  } = useForm<BirthdateFormValues>({
    resolver: zodResolver(birthdateSchema),
    defaultValues: {
      birthdate: ''
    }
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const goToNextTask = useCallback(() => {
    const taskIndex = tasks.findIndex((t) => t.id === task.id);
    const nextTask = tasks[taskIndex + 1];
    if (nextTask) {
      navigate(`/task/${nextTask.id}`);
    } else {
      navigate('/');
    }
  }, [tasks, navigate, task]);

  const updateStatus = useCallback(
    (status: 'escalated' | 'done') => {
      mutation.mutate(
        { id: task.id, data: { status } },
        {
          onSuccess: goToNextTask,
        }
      );
    },
    [mutation, task, goToNextTask]
  );

  const saveBirthdate = (values: BirthdateFormValues) => {
    mutation.mutate({ id: task.id, data: { birthdate: values.birthdate } });
  };

  return (
    <>
      <div className="bg-white p-4 border-2 border-gray-300 rounded-lg shadow-md max-w-[600px] flex flex-col gap-4 mb-3">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col items-start justify-start h-full">
            <span className="text-sm text-blue-600">Insured person</span>
            <span className="text-base min-h-[1.5rem] block text-blue-600">
              {task.name}
            </span>
          </div>
          <div className="flex flex-col items-start justify-start h-full">
            <span className="text-sm text-gray-500">Insurance number</span>
            <span className="text-base text-black min-h-[1.5rem] block">
              {task.contractNumber}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col items-start justify-start h-full">
            <span className="text-sm text-gray-500">Gender</span>
            <span className="text-base text-black min-h-[1.5rem] block">
              {task.sex}
            </span>
          </div>
          <div className="flex flex-col items-start justify-start h-full">
            <span className="text-sm text-gray-500">Birthdate</span>
            <span className="text-base text-black min-h-[1.5rem] block">
              {task.birthdate}
            </span>
          </div>
          <div className="flex flex-col items-start justify-start h-full">
            <span className="text-sm text-gray-500">Status</span>
            <span className="text-base text-black min-h-[1.5rem] block">
              {task.status}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start h-full">
          <span className="text-sm text-gray-500">Address</span>
          <span className="text-base text-black min-h-[1.5rem] block">
            {task.address}
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(saveBirthdate)} className="flex justify-between flex-wrap p-4 rounded-lg shadow-sm items-end">
        <div className="flex flex-col items-start justify-start h-full">
          <Label htmlFor="birthdate" className="mb-3">
            Add missing birthdate information (DD.MM.YYYY)
          </Label>
          <Input
            className="w-[90%]"
            type="date"
            id="birthdate"
            aria-invalid={!!errors.birthdate}
            aria-describedby={errors.birthdate ? "birthdate-error" : undefined}
            placeholder="Add missing birthdate information"
            {...register("birthdate")}
            />
          {errors.birthdate && (
              <p id="birthdate-error" className="text-sm text-red-600 mt-1">
                {errors.birthdate.message}
              </p>
          )}
        </div>
        <Button type="submit" disabled={mutation.isPending || isSubmitting}>
          {mutation.isPending || isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </form>
      <div className="flex justify-between flex-wrap gap-3 mt-4">
        <Button
          onClick={() => updateStatus('done')}
          className="text-white bg-emerald-500 hover:bg-emerald-600"
        >
          Done
        </Button>
        <Button
          variant="secondary"
          onClick={() => updateStatus('escalated')}
          className="text-white bg-amber-500 hover:bg-amber-600"
        >
          Escalate
        </Button>
        <Button
          variant="outline"
          onClick={goToNextTask}
          className="text-white bg-gray-500 hover:bg-gray-600"
        >
          Skip
        </Button>
      </div>
    </>
  );
}
