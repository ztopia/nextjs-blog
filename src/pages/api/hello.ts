export default (req: any, res: any) => {
  console.log(req);
  res.status(200).json({ text: "Hello" });
};
