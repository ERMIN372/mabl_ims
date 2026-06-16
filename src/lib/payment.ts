// Абстракция платёжного провайдера.
//
// Сейчас реализован mock-сценарий оплаты. Архитектура подготовлена под
// подключение реального провайдера (ЮKassa, CloudPayments, Stripe и т.п.):
// достаточно реализовать интерфейс PaymentProvider и заменить mockProvider.

export interface PaymentRequest {
  itemId: string;
  itemTitle: string;
  amount: number; // в рублях
  email: string;
  name: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  // Mock-доступ, который выдаётся после успешной оплаты.
  // TODO(backend): реальные учётные данные должен выдавать backend после
  // подтверждения платежа провайдером (webhook), а не клиент.
  credentials?: {
    login: string;
    password: string;
  };
}

export interface PaymentProvider {
  pay(req: PaymentRequest): Promise<PaymentResult>;
}

// --- MOCK ПРОВАЙДЕР --------------------------------------------------------
function generateCredentials(email: string) {
  const login = email.includes("@") ? email : `${email}@mabl.academy`;
  // Простой псевдо-пароль для демонстрации. НЕ для production.
  const password = "mabl-" + Math.random().toString(36).slice(2, 8);
  return { login, password };
}

export const mockProvider: PaymentProvider = {
  async pay(req: PaymentRequest): Promise<PaymentResult> {
    // Имитация задержки обращения к платёжному шлюзу.
    await new Promise((r) => setTimeout(r, 1200));
    return {
      success: true,
      transactionId: "mock_" + Date.now().toString(36),
      credentials: generateCredentials(req.email),
    };
  },
};

// Текущий активный провайдер. Для production заменить на реальную реализацию.
export const paymentProvider: PaymentProvider = mockProvider;
