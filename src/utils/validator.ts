export class Validation {
  private validacoes: Array<(() => boolean) | boolean> = [];
  private cbFunction: (args: any) => void = () => {};
  private CustomErrorAllowance: Partial<{
    customError: boolean;
    messageError: string;
  }>;

  constructor(
    validacoes: Array<(() => boolean) | boolean>,
    permitCustomError: Partial<{ customError: boolean; messageError: string }>
  ) {
    this.validacoes = this.validacoes.concat(validacoes);
    this.CustomErrorAllowance = permitCustomError;
  }

  customError(callback: (args: any) => void) {
    this.cbFunction = callback;
  }

  async getResultValidation(): Promise<boolean> {
    const promisses = this.validacoes.map(
      (validacao) =>
        new Promise<boolean | (() => boolean)>((resolve) =>
          resolve(typeof validacao === "function" ? validacao() : validacao)
        )
    );
    try {
      const resultados = await Promise.all(promisses);

      if (
        !resultados.every((resultado) => resultado) &&
        this.CustomErrorAllowance.customError
      ) {
        this.cbFunction(this.CustomErrorAllowance.messageError);
      }

      return resultados.every((resultado) => resultado);
    } catch (error) {
      this.cbFunction(`Ocorreu um erro ao fazer a validação: ${error}`);
      return false;
    }
  }
}
