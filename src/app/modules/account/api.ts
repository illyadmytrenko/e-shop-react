import { baseApi } from "@/common/shared/api";
import { z } from "zod";
import { Order } from "@/common/types/order";

const OrderDtoSchema = z.object({
  orderId: z.string(),
  userId: z.number(),
  productsIds: z.string(),
  orderDate: z.string(),
  totalPrice: z.number(),
  orderStatus: z.string(),
  userAddress: z.string(),
  userPhoneNumber: z.string(),
  userName: z.string(),
  userPostalCode: z.string(),
});

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getOrders: create.query<Order[], number>({
      query: (userId) => `account/orders/${userId}`,
      providesTags: ["Users"],
      transformResponse: (res: unknown) => OrderDtoSchema.array().parse(res),
    }),
  }),
  overrideExisting: true,
});
