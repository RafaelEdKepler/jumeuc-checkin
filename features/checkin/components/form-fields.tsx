import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { FormFieldsComponentProps } from "../types";

export default function FormFieldsComponent({
  loading,
  storedNames,
  disabled,
}: FormFieldsComponentProps) {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Digite seu nome"
        name="name"
        className={
          disabled
            ? "opacity-80 cursor-not-allowed bg-muted text-muted-foreground"
            : ""
        }
        readOnly={disabled ? disabled : loading}
        defaultValue={disabled ? storedNames[storedNames.length - 1] : ""}
      />
      <datalist id="names">
        {storedNames.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>
      <Button type="submit">Confirmar</Button>
    </div>
  );
}
