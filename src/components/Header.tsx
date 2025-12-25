import { Logo } from "./Logo";
import { Menu } from "./Menu";

type Props = {
  date: Date;
};

export const Header = ({ date }: Props) => {
  return (
    <div className='flex justify-between items-center p-4 sticky top-0 left-0 right-0 z-50 h-10 bg-blue-bold'>
      <Logo date={date} />
      <Menu />
    </div>
  );
};
