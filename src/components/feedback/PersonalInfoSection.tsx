
import { Input } from "@/components/ui/input";

type PersonalInfoProps = {
  name: string;
  email: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
};

export const PersonalInfoSection = ({ 
  name, 
  email, 
  onNameChange, 
  onEmailChange 
}: PersonalInfoProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">À propos de vous</h2>
      
      <div>
        <label className="block text-sm font-medium mb-1">Nom (Optionnel)</label>
        <Input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Votre nom"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Email (Optionnel)</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="Votre email"
        />
      </div>
    </div>
  );
};
