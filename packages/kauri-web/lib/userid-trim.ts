export default (user: string) =>
  "0x" + user.substring(0, 4) + "..." + user.substring(36, 42);
