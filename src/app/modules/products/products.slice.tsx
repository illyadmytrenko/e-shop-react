import { Product } from "@/common/types/product";
import { createSlice } from "@reduxjs/toolkit";

type ProductsState = {
  likedProducts: Record<number, Record<number, boolean>>;
  chosenProducts: Record<
    number,
    Record<string, { isChosen: boolean; count: number }>
  >;
  category:
    | "Mobile"
    | "Laptop"
    | "Tablet"
    | "Audio"
    | "Wearable"
    | "Camera"
    | "Gaming"
    | "Network"
    | "Accessories";
  status: "idle" | "loading" | "success" | "error";
};

const initialState: ProductsState = {
  likedProducts: {},
  chosenProducts: {},
  category: "Mobile",
  status: "idle",
};

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    likeProduct: (state, action): void => {
      state.status = "loading";
      const { userId, productId } = action.payload;
      if (!state.likedProducts[userId]) {
        state.likedProducts[userId] = {};
      }
      state.likedProducts[userId] = {
        ...state.likedProducts[userId],
        [productId]: true,
      };
      state.status = "success";
    },
    dislikeProduct: (state, action): void => {
      state.status = "loading";
      const { userId, productId } = action.payload;
      if (state.likedProducts[userId]) {
        delete state.likedProducts[userId][productId];
        if (Object.keys(state.likedProducts[userId]).length === 0) {
          delete state.likedProducts[userId];
        }
      }
      state.status = "success";
    },
    addProductToCart: (state, action): void => {
      state.status = "loading";
      const { userId, productId } = action.payload;
      if (!state.chosenProducts[userId]) {
        state.chosenProducts[userId] = {};
      }
      const product = state.chosenProducts[userId][productId];
      if (product) {
        state.chosenProducts[userId][productId] = {
          ...product,
          count: product.count + 1,
        };
      } else {
        state.chosenProducts[userId][productId] = {
          isChosen: true,
          count: 1,
        };
      }
      state.status = "success";
    },
    removeProductFromCart: (state, action): void => {
      state.status = "loading";
      const { userId, productId } = action.payload;
      if (
        state.chosenProducts[userId] &&
        state.chosenProducts[userId][productId]
      ) {
        const product = state.chosenProducts[userId][productId];

        if (product.count > 1) {
          state.chosenProducts[userId][productId] = {
            ...product,
            count: product.count - 1,
          };
        } else {
          delete state.chosenProducts[userId][productId];
        }

        if (Object.keys(state.chosenProducts[userId]).length === 0) {
          delete state.chosenProducts[userId];
        }
        state.status = "success";
      }
    },
    deleteProductFromCart: (state, action): void => {
      state.status = "loading";
      const { userId, productId } = action.payload;
      if (
        state.chosenProducts[userId] &&
        state.chosenProducts[userId][productId]
      ) {
        delete state.chosenProducts[userId][productId];

        if (Object.keys(state.chosenProducts[userId]).length === 0) {
          delete state.chosenProducts[userId];
        }
        state.status = "success";
      }
    },
    setProductsCategory: (state, action): void => {
      state.status = "loading";
      const { category } = action.payload;
      state.category = category;
      state.status = "success";
    },
    setProductsIdle: (state): void => {
      state.status = "idle";
    },
    setProductsLoading: (state): void => {
      state.status = "loading";
    },
    setProductsSuccess: (state): void => {
      state.status = "success";
    },
    setProductsError: (state): void => {
      state.status = "error";
    },
  },
  selectors: {
    selectIsLiked: (
      state: ProductsState,
      userId: number,
      productId: number
    ): boolean => state.likedProducts[userId]?.[productId] || false,
    selectLikedProductsIds: (
      state: ProductsState,
      userId: number
    ): string[] => {
      if (!state.likedProducts[userId]) {
        return [];
      }
      return Object.entries(state.likedProducts[userId])
        .filter(([, isLiked]) => isLiked)
        .map(([productId]) => productId);
    },
    selectLikedProducts: (
      state: ProductsState,
      userId: number,
      products: Product[]
    ): Product[] => {
      const likedIds = state.likedProducts[userId]
        ? Object.keys(state.likedProducts[userId])
        : [];
      return likedIds
        .map((id) => products.find((p) => p.id.toString() === id)!)
        .filter(Boolean);
    },
    selectChosenProductsIds: (
      state: ProductsState,
      userId: number
    ): string[] => {
      if (!state.chosenProducts[userId]) {
        return [];
      }
      return Object.entries(state.chosenProducts[userId])
        .filter(([, isChosen]) => isChosen)
        .map(([productId]) => productId);
    },
    selectChosenProductsTotalPrice: (
      state: ProductsState,
      userId: number,
      products: Product[]
    ): number => {
      if (!state.chosenProducts[userId]) {
        return 0;
      }
      return Object.entries(state.chosenProducts[userId])
        .filter(([, { isChosen }]) => isChosen)
        .reduce((totalPrice, [productId]) => {
          const product = products.find((p) => p.id.toString() === productId);
          if (product) {
            const productPrice = product.price;
            const productCount =
              state.chosenProducts[userId][productId].count || 0;
            return totalPrice + productPrice * productCount;
          }

          return totalPrice;
        }, 0);
    },
    selectChosenProductCount: (
      state: ProductsState,
      userId: number,
      productId: number
    ): number => {
      return state.chosenProducts[userId][productId].count || 0;
    },
    selectProductCategory: (state: ProductsState): string => state.category,
    selectProductStatus: (state: ProductsState): string => state.status,
  },
});

export const {
  likeProduct,
  dislikeProduct,
  addProductToCart,
  removeProductFromCart,
  deleteProductFromCart,
  setProductsCategory,
  setProductsIdle,
  setProductsLoading,
  setProductsSuccess,
  setProductsError,
} = productsSlice.actions;

export default productsSlice.reducer;
