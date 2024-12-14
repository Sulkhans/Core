import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductBaseType } from "../../types/types";

interface FavoriteState {
  favorites: ProductBaseType[];
}

const initialState: FavoriteState = {
  favorites: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites") || "[]")
    : [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<ProductBaseType>) => {
      state.favorites.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
