import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import CreateTaskForm from "@/components/CreateTaskForm.tsx";

export default function CreateTaskDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Create task
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90dvh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create a task</DialogTitle>
                </DialogHeader>
                <CreateTaskForm />
            </DialogContent>
        </Dialog>
    );
};