// type Ttoast = {
//   success: (message: string) => unknown;
//   error: (message: string) => unknown;
// };
import { FieldValues } from "react-hook-form";

export class FormDataSet {
  private formData: FormData;
  private raw: FieldValues;
  private limiterFile: number;
  private fileName: string;

  constructor() {
    this.formData = new FormData();
    this.raw = {};
    this.limiterFile = 5 * 1024 * 1024; // 5mb
    this.fileName = "default";
    // th;
  }

  public rawForm(data: FieldValues): void {
    this.raw = data;
  }

  public limitFileSize(maxSizeInBytes: number): void {
    this.limiterFile = maxSizeInBytes;
  }

  public setNameFile(newName: string): void {
    this.fileName = newName;
  }

  public append(type: "image" | "string", name: string): void {
    if (Object.keys(this.raw).length === 0) {
      throw new Error("Você deve chamar rawForm antes de chamar append.");
    }

    if (type === "image") {
      if (this.raw[name][0].size > this.limiterFile)
        throw new Error("Arquivo passou do limite de imagem definida");

      const fileMeta = this.raw[name][0];
      const fileName = fileMeta.name;
      const fileExtension = fileName.split(".").pop();

      const newName = `${this.fileName}.${fileExtension}`;

      this.formData.append(
        name,
        new File([this.raw[name][0]], newName, { type: this.raw[name][0].type })
      );
    } else if (type === "string") {
      this.formData.append(name, this.raw[name]);
    }
  }

  public getFormData() {
    return this.formData;
  }
}
