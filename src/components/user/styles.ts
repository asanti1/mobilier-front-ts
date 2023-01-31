import { SxProps } from "@mui/material";
import theme from "../../material/theme";

export const containerStyle: SxProps = {
  backgroundColor: theme.palette.grey[900],
  border: 1,
  borderColor: theme.palette.primary.main,
  borderRadius: "15px",
  borderWidth: "5px",
  position: "relative",
  alignItems: "center",
  marginTop: "48px",
};

export const modalStyle: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: theme.palette.grey[900],
  border: 1,
  borderRadius: "15px",
  borderWidth: "5px",
};
