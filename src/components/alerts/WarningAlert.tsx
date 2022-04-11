import { Alert } from "reactstrap";

interface Props {
  children: string;
}

export const WarningAlert = ({ children }: Props) => {
  return (
    <Alert className="my-4" color="warning" dismissible>
      {children}
    </Alert>
  );
};
