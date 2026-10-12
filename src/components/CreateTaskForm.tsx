import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  type CreateTaskFormValues,
  createTaskSchema,
} from '@/schemas/createTaskSchema.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useMutation } from '@tanstack/react-query';
import { createTask } from '@/api/tasks.ts';
import { queryClient } from '@/lib/queryClient.ts';

export default function CreateTaskForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      contractNumber: '',
      sex: 'female',
      address: '',
      birthdate: '',
      name: '',
      status: 'new',
    },
  });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      reset();
    },
  });

  const onSubmit = async (values: CreateTaskFormValues) => {
    await mutation.mutateAsync(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="contract-number">Contract number</Label>
        <Input
          id="contract-number"
          aria-invalid={!!errors.contractNumber}
          aria-describedby={
            errors.contractNumber ? 'contract-number-error' : undefined
          }
          {...register('contractNumber')}
        />
        {errors.contractNumber && (
          <p id="contract-number-error" className="text-sm text-destructive">
            {errors.contractNumber.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
          )}
        ></Controller>
        {errors.status && (
          <p id="status-error" className="text-sm text-destructive">
            {errors.status.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="birthdate" className="">
          Birthdate (optional)
        </Label>
        <Input
          className=""
          type="date"
          id="birthdate"
          aria-invalid={!!errors.birthdate}
          aria-describedby={errors.birthdate ? 'birthdate-error' : undefined}
          {...register('birthdate')}
        />
        {errors.birthdate && (
          <p id="birthdate-error" className="text-sm text-destructive">
            {errors.birthdate.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="sex">Sex</Label>
        <Controller
          name="sex"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="sex">
                <SelectValue placeholder="Select sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
              </SelectContent>
            </Select>
          )}
        ></Controller>
        {errors.sex && (
          <p id="sex-error" className="text-sm text-destructive">
            {errors.sex.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? 'address-error' : undefined}
          {...register('address')}
        />
        {errors.address && (
          <p id="address-error" className="text-sm text-destructive">
            {errors.address.message}
          </p>
        )}
      </div>
      {mutation.isError && (
        <p role="alert" className="text-sm text-destructive">
          Failed to create task. Please try again.
        </p>
      )}
      {mutation.isSuccess && (
        <p role="status" className="text-sm">
          Task created successfully!
        </p>
      )}
      <Button type="submit" disabled={isSubmitting || mutation.isPending}>
        {isSubmitting || mutation.isPending
          ? 'Creating task...'
          : 'Create task'}
      </Button>
    </form>
  );
}
