import { useNavigate, useSearchParams } from "react-router";

export const usePerson = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedPerson = searchParams.get("person");

  const setSelectedPerson = (name: string) => {
    if (selectedPerson === name) {
      searchParams.delete("person");
    } else {
      searchParams.set("person", name);
    }
    navigate({ search: searchParams.toString() });
  };

  return {
    selectedPerson,
    setSelectedPerson,
  };
};
