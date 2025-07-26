const MemberCountText = ({ count }: { count: number }) => {
  // 혼자만 있는 대시보드의 경우 함께할 동료를 추가하라는 메시지 출력
  if (count === 0) {
    return (
      <p className="text-taskify-xs-normal text-taskify-neutral-400 whitespace-nowrap">
        함께할 동료를 추가해보세요
      </p>
    );
  }

  // 한 명 이상 있을 경우 총 참여중인 사람 수를 출력
  return (
    <p className="text-taskify-xs-normal text-taskify-neutral-400 whitespace-nowrap">
      <span className="text-taskify-xs-medium text-taskify-neutral-500">
        {count}명
      </span>
      이 참여하고 있어요
    </p>
  );
};

export default MemberCountText;
