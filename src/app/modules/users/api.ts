import { baseApi } from "@/common/shared/api";
import { z } from "zod";
import { UserInfo } from "@/common/types/user-info";

const UserDtoSchema = z.object({
  userId: z.number(),
  userEmail: z.string(),
  userName: z.string(),
  userAddress: z.union([z.string(), z.null()]),
  userPostalCode: z.union([z.string(), z.null()]),
  userPhoneNumber: z.union([z.string(), z.null()]),
});

export const userApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUser: create.query<UserInfo, number>({
      query: (userId) => `/user/${userId}`,
      providesTags: ["Users"],
      transformResponse: (res: unknown) => UserDtoSchema.parse(res),
    }),
  }),
  overrideExisting: true,
});
