import { SelectionCheckbox } from "./SelectionCheckbox";

interface Props {
  checked: boolean;
  onToggle: () => void;
}

export function SelectAllCell({ checked, onToggle }: Props) {
  return (
    <th scope="col" className="w-10 px-3 pb-2 pt-1">
      <SelectionCheckbox checked={checked} label="Tout sélectionner" onChange={onToggle} />
    </th>
  );
}
