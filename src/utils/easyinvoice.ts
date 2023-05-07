import EasyInvoice from "easyinvoice";
import * as fs from "fs";

export const generateInvoice = async (data: any) => {
  const result = await EasyInvoice.createInvoice(data);

  fs.writeFileSync("invoice.pdf", result.pdf, "base64");
};
