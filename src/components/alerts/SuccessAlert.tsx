import { Alert } from "reactstrap";

interface Props {
  children: string;
}

export const SuccessAlert = ({ children }: Props) => {
  return (
    <Alert className="my-4" dismissible>
      {children}
    </Alert>
  );
};
