export default (user: string) =>
  (user.substring(0, 2) === "0x" ? "" : "0x") +
  user.substring(0, 4) +
  "..." +
  user.substring(36, 42);
