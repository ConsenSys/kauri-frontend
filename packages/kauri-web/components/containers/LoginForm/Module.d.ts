export interface RegisterActionPayload {
  type?: "login" | "register";
  userId: string;
}

interface RegisterAction {
  type: string;
  payload: RegisterActionPayload;
  callback: any;
}

export const registerAction = (
  payload: RegisterActionPayload,
  callback: any
): RegisterAction => ({
  type: REGISTER,
  payload,
  callback,
});
