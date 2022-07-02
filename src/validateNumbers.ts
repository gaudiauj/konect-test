interface Response {
  code: string;
}

export const validateNumbers = (number: string): Promise<Response> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response: Response = { code: "200" };
      if (number !== "123456") {
        response.code = "401";
      }
      resolve(response);
    }, 1000);
  });
};
