'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { useDialogStore } from '@/stores/useDialogStore';

/**
 * @interface AlertDialogProps
 * @description AlertDialog 컴포넌트가 사용하는 props 정의
 * @property {string} decription 메세지 본문 텍스트
 * @property {string} closeBtnText 다이얼로그를 닫는 버튼에 표시될 텍스트
 * @property {boolean} isGoBack 닫기 버튼 클릭 후, 이전 다이얼로그로 돌아갈 것인지에 대한 플래그 (기본값 false)
 * @property {string} navigate useRouter 네비게이션 추가
 */
interface AlertDialogProps {
  description: string;
  closeBtnText: string;
  isGoBack?: boolean;
  navigate?: string;
}

const AlertDialog = ({
  description,
  closeBtnText,
  isGoBack = false,
  navigate,
}: AlertDialogProps) => {
  const { closeDialog, goBack } = useDialogStore();

  const router = useRouter();

  const content = (
    <DialogContent
      className="w-[272px] gap-8 px-10 py-8 md:w-[368px]"
      showCloseButton={false}
    >
      <DialogHeader className="gap-0">
        <DialogTitle className="text-center">
          <span className="text-taskify-lg-medium text-taskify-neutral-700 md:text-taskify-xl-medium">
            {description}
          </span>
        </DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <DialogFooter>
        <Button
          className="bg-taskify-violet-primary hover:bg-taskify-violet h-auto w-full cursor-pointer"
          // onClick={isGoBack ? goBack : closeDialog}
          onClick={() => {
            if (isGoBack) return goBack();

            if (navigate) {
              router.push(navigate);
              return closeDialog();
            }

            return closeDialog();
          }}
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
