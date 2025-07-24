import { Button } from '@/components/ui/Button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/Dialog';
import { useDialogStore } from '@/stores/useDialogStore';

/**
 * @interface AlertDialogProps
 * @description AlertDialog 컴포넌트가 사용하는 props 정의
 * @property {string} decription 메세지 본문 텍스트
 * @property {string} closeBtnText 다이얼로그를 닫는 버튼에 표시될 텍스트
 */
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
          className="bg-taskify-violet-primary hover:bg-taskify-violet h-auto w-full cursor-pointer"
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
