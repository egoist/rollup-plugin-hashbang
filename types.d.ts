declare module "executable" {
  function isExecutable(path: string): Promise<boolean>;
  export default isExecutable;
}
