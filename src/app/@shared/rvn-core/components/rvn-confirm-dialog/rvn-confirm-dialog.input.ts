import { RvnButtonInput } from "../rvn-button/rvn-button.input";

export interface RvnConfirmDialogInput{
  title?: string;
  message?: string;
  yesButtonMessage?: string;
  yesButtonConfig?: RvnButtonInput;
  noButtonMessage?: string;
  noButtonConfig?: RvnButtonInput;
}