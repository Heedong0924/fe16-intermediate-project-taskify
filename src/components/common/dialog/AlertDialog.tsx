import { Button } from '@/components/ui/Button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/Dialog';
import { useDialogStore } from '@/store/dialogStore';

interface AlertDialogProps {
  description: string;
  closeBtnText: string;
}

const AlertDialog = ({ description, closeBtnText }: AlertDialogProps) => {
  const { closeDialog } = useDialogStore();

  const content = (
    <DialogContent
      className="w-[272px] gap-8 px-10 py-8 md:w-[368px]"
      showCloseButton={false}
    >
      <DialogHeader className="flex">
        <DialogDescription className="text-center">
          <span className="text-taskify-lg-medium text-taskify-neutral-700 md:text-taskify-xl-medium">
            {description}
          </span>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          className="bg-taskify-violet-primary hover:bg-taskify-violet h-auto w-full"
          onClick={closeDialog}
        >
          <span className="text-taskify-md-semibold text-taskify-neutral-0 md:text-taskify-lg-medium">
            {closeBtnText}
          </span>
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  return content;
};

export default AlertDialog;
