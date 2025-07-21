import Chip from '@/components/common/Chip';
import { AvatarProfile, UserProfile } from '@/components/common/Profile';

function Test() {
  return (
    <div>
      <h1 className="text-2xl font-bold">프로필 공통 컴포넌트</h1>
      <h1 className="text-xl font-bold">UserProfile (아바타 + 이름)</h1>
      <UserProfile profileImg="https://github.com/shadcn.png" userName="유저" />
      <UserProfile profileImg="잘못된주소" userName="홍길동" />
      <UserProfile profileImg="" userName="김민수" />
      <UserProfile userName="kara" />
      <h1 className="text-xl font-bold">AvatarProfile (아바타)</h1>
      <p>
        영어 이름에 경우 대문자로 나옵니다. <br /> 색상은 랜덤
      </p>
      <AvatarProfile userName="박연희" />
      <AvatarProfile userName="2팀" />
      <AvatarProfile userName="Alice" />
      <hr />
      <h1 className="text-2xl font-bold">chip 공통 컴포넌트</h1>
      <Chip>프로젝트</Chip>
      <Chip>일반</Chip>
      <Chip>무슨색이 나올까</Chip>
      <Chip>2팀</Chip>
      <Chip> 12</Chip>
    </div>
  );
}

export default Test;
