declare module "he" {
  function decode(html: string): string;
  function encode(text: string): string;
  export { decode, encode };
}
