import { Alert } from "reactstrap";

interface Props {
  children: string;
}

export const ErrorAlert = ({ children }: Props) => {
  return (
    <Alert className="my-4" color="error">
      {children}
    </Alert>
  );
};
