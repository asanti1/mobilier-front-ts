import { SxProps } from "@mui/material";
import theme from "../../../material/theme";

export const containerStyle: SxProps = {
  backgroundColor: theme.palette.grey[900],
  border: 1,
  borderColor: theme.palette.primary.main,
  borderRadius: "15px",
  borderWidth: "5px",
  position: "relative",
  alignItems: "center",
  marginTop: "15vh",
};
