import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Error: React.FC<{ errorMessage: string; statusCode?: number }> = ({
  errorMessage,
  statusCode,
}) => {
  return (
    <Alert
      severity="error"
      style={{ marginTop: 16, boxShadow: "5px 5px 5px #ddd" }}
    >
      <AlertTitle>Error {statusCode}</AlertTitle>
      {errorMessage}
    </Alert>
  );
};

export default Error;
