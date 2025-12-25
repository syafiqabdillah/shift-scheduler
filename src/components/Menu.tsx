import { useState } from "react";
import { FaChevronRight, FaTrashAlt } from "react-icons/fa";
import { RiSettingsLine } from "react-icons/ri";
import { useComponentVisible } from "../hooks/useComponentVisible";
import { usePerson } from "../hooks/usePerson";
import { useScheduleStore } from "../hooks/useScheduleStore";

export const Menu = () => {
  const [newPerson, setNewPerson] = useState("");

  const {
    ref: menuRef,
    isComponentVisible: showSettings,
    setIsComponentVisible: setShowSettings,
  } = useComponentVisible(false);

  const { persons, addPerson, removePerson } = useScheduleStore();

  const toggleSettings = () => setShowSettings((prev) => !prev);

  return (
    <div
      className='cursor-pointer relative h-[30px] flex items-center'
      onClick={toggleSettings}
      ref={menuRef}
    >
      <RiSettingsLine size={20} />

      {/* Menu */}
      {showSettings && (
        <div
          className='absolute top-7 right-2 bg-green border font-semibold border-white rounded shadow-lg p-4 z-100 min-w-[200px] flex flex-col gap-2'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type='text'
            placeholder='Enter new person name'
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
            className='bg-white p-2 outline-none border-none rounded text-navy'
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addPerson(newPerson);
                setNewPerson("");
              }
            }}
          />
          {persons.map((person) => (
            <MenuItem key={person} label={person} />
          ))}
          <hr />
          <input
            type='file'
            name='add-bulk'
            id='add-bulk'
            className='bg-white p-2 rounded text-green'
            accept='.txt'
          />
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ label }: { label: string }) => {
  const { removePerson } = useScheduleStore();
  const { selectedPerson, setSelectedPerson } = usePerson();

  return (
    <div className='whitespace-nowrap min-h-6 flex items-center justify-between relative '>
      <div
        onClick={() => setSelectedPerson(label)}
        className='flex items-center gap-1'
      >
        {selectedPerson === label && <FaChevronRight />}
        {label}
      </div>
      <FaTrashAlt className='peer/delete' onClick={() => removePerson(label)} />
      {/* tooltip */}
      <div className='absolute right-0 top-6 peer-hover/delete:flex hidden bg-blue-bold text-white p-2 rounded z-10 border border-solid border-white'>
        Delete {label} and all their shifts
      </div>
    </div>
  );
};
