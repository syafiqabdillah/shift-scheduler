import { format } from "date-fns";
import { useState } from "react";
import { RiSettingsLine } from "react-icons/ri";
import { usePerson } from "../hooks/usePerson";

type Props = {
  date: Date;
};

export const Header = ({ date }: Props) => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => setShowSettings((prev) => !prev);

  const { selectedPerson } = usePerson();

  return (
    <div className='flex justify-between items-center p-4'>
      <div>
        Schedule of {format(date, "MMMM yyyy")}
        {selectedPerson && ` - ${selectedPerson}`}
      </div>
      <div className='cursor-pointer relative' onClick={toggleSettings}>
        <RiSettingsLine size={20} />

        {/* Menu */}
        {showSettings && (
          <div className='absolute top-7 right-2 bg-lime-800 border border-gray-300 rounded shadow-lg p-4 z-100'>
            yahoo
          </div>
        )}
      </div>
    </div>
  );
};
