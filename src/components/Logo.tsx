import { format } from "date-fns";
import { usePerson } from "../hooks/usePerson";

type Props = {
  date: Date;
};

export const Logo = ({ date }: Props) => {
  const { selectedPerson } = usePerson();

  return (
    <div>
      Schedule of {format(date, "MMMM yyyy")}
      {selectedPerson && ` - ${selectedPerson}`}
    </div>
  );
};
