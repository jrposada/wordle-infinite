declare module "*.svg" {
  const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;
  export { ReactComponent };
}

declare module "*.png" {
  const source: string;
  export default source;
}
