type IyzipayClient = {
  checkoutFormInitialize: {
    create: (
      request: PaymentRequest,
      cb: (err: Error | null, result: IyzicoCheckoutFormResult) => void
    ) => void;
  };
  checkoutForm: {
    retrieve: (
      request: { token: string },
      cb: (err: Error | null, result: CheckoutFormRetrieveResult) => void
    ) => void;
  };
};

let iyzipayClient: IyzipayClient | null = null;

function getIyzipayClient(): IyzipayClient {
  if (iyzipayClient) return iyzipayClient;

  // Keep require dynamic so Turbopack does not attempt to statically bundle iyzipay internals.
  const runtimeRequire = eval("require") as NodeRequire;
  const Iyzipay = runtimeRequire("iyzipay");

  iyzipayClient = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY || "",
    secretKey: process.env.IYZICO_SECRET_KEY || "",
    uri: process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com",
  }) as IyzipayClient;

  return iyzipayClient;
}

export interface PaymentItem {
  id: string;
  name: string;
  category1: string;
  itemType: string;
  price: string;
}

export interface PaymentRequest {
  price: string;
  paidPrice: string;
  currency: string;
  installment: string;
  basketId: string;
  paymentChannel: string;
  paymentGroup: string;
  callbackUrl: string;
  buyer: {
    id: string;
    name: string;
    surname: string;
    email: string;
    identityNumber: string;
    registrationAddress: string;
    city: string;
    country: string;
    ip: string;
    gsmNumber?: string;
  };
  shippingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
  };
  billingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
  };
  basketItems: PaymentItem[];
  cardHolderName?: string;
  cardNumber?: string;
  expireMonth?: string;
  expireYear?: string;
  cvc?: string;
}

export interface IyzicoCheckoutFormResult {
  status: string;
  paymentPageUrl?: string;
  token?: string;
  errorMessage?: string;
  errorCode?: string;
}

export function createCheckoutForm(
  request: PaymentRequest
): Promise<IyzicoCheckoutFormResult> {
  const iyzipay = getIyzipayClient();
  return new Promise((resolve, reject) => {
    iyzipay.checkoutFormInitialize.create(request, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export interface CheckoutFormRetrieveResult {
  status: string;
  paymentStatus?: string;
  paymentId?: string;
  token?: string;
  errorMessage?: string;
}

export function retrieveCheckoutForm(token: string): Promise<CheckoutFormRetrieveResult> {
  const iyzipay = getIyzipayClient();
  return new Promise((resolve, reject) => {
    iyzipay.checkoutForm.retrieve({ token }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
