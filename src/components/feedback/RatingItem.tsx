
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type RatingItemProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export const RatingItem = ({ label, value, onChange }: RatingItemProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Select
        value={value.toString()}
        onValueChange={(value) => onChange(parseInt(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner une note" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(10)].map((_, i) => (
            <SelectItem key={i + 1} value={(i + 1).toString()}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
