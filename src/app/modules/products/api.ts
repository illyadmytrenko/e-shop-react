import { z } from "zod";
import { baseApi } from "@/common/shared/api";
import { Product } from "@/common/types/product";
import { ProductCharacteristics } from "@/common/types/product-characteristics";

const ProductDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  releaseDate: z.string().date(),
  category: z.string(),
  brand: z.string(),
  rating: z.union([z.number(), z.null()]),
  sellsAmount: z.union([z.number(), z.null()]),
  color: z.string(),
  image: z.union([z.string(), z.null()]),
});

const ProductCharacteristicsDtoSchema = z.object({
  id: z.number(),
  productId: z.number(),
  brand: z.string(),
  char1: z.union([z.string(), z.null()]),
  char2: z.union([z.string(), z.null()]),
  char3: z.union([z.string(), z.null()]),
  char4: z.union([z.string(), z.null()]),
  char5: z.union([z.string(), z.null()]),
  char6: z.union([z.string(), z.null()]),
  char7: z.union([z.string(), z.null()]),
  char8: z.union([z.string(), z.null()]),
});

const CommentDtoSchema = z.object({
  commentId: z.number(),
  userId: z.number(),
  productId: z.number(),
  comment: z.string(),
  commentRating: z.number(),
  commentLikes: z.number(),
  commentDislikes: z.number(),
  commentDate: z.string(),
});

export type Comment = z.infer<typeof CommentDtoSchema>;

export const productsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getProducts: create.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Products"],
      transformResponse: (res: unknown) => ProductDtoSchema.array().parse(res),
    }),
    getProduct: create.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
      transformResponse: (res: unknown) => {
        const result = Array.isArray(res) ? res[0] : res;
        return ProductDtoSchema.parse(result);
      },
    }),
  }),
  overrideExisting: true,
});

export const productsCharacteristicsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getCharacteristics: create.query<ProductCharacteristics[], void>({
      query: () => "/characteristics",
      providesTags: ["Characteristics"],
      transformResponse: (res: unknown) =>
        ProductCharacteristicsDtoSchema.array().parse(res),
    }),
    getCharacteristicsById: create.query<ProductCharacteristics, number>({
      query: (id) => `/characteristics/${id}`,
      providesTags: ["Characteristics"],
      transformResponse: (res: unknown) => {
        const result = Array.isArray(res) ? res[0] : res;
        return ProductCharacteristicsDtoSchema.parse(result);
      },
    }),
  }),
  overrideExisting: true,
});

export const commentsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getCommentsByProductId: create.query<Comment[], number>({
      query: (productId) => `/comments/${productId}`,
      providesTags: ["Comments"],
      transformResponse: (res: unknown) => CommentDtoSchema.array().parse(res),
    }),
  }),
  overrideExisting: true,
});
