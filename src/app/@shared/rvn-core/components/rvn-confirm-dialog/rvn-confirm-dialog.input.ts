import { RvnButtonInput } from "../rvn-button/rvn-button.input";

export interface RvnConfirmDialogInput{
  title?: string;
  message?: string;
  yesButtonMessage?: string;
  yesButtonParams?: RvnButtonInput;
  noButtonMessage?: string;
  noButtonParams?: RvnButtonInput;
}