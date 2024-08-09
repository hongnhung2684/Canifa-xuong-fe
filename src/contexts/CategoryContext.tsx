import { createContext } from "vm";
import { Category } from "../interfaces/Category";
import { useEffect, useReducer } from "react";
import categoryReducer from "../reducers/categoryReducer";
import { useNavigate } from "react-router-dom";
import instance from "../apis";

export type CategoryContextType = {
  state: { categories: Category[] };
  dispatch: React.Dispatch<any>;
  handleCategory: (category: Category) => void;
  removeCategory: (_id: string) => void;
};
export const CategoryContext = createContext({} as CategoryContextType);

const CategoryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(categoryReducer, { categories: [] });
  const nav = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/categories");
      console.log(data);
      dispatch({ type: "SET_CATEGORIES", payload: data.data });
    })();
  }, []);

  const handleCategory = async (category: Category) => {
    try {
      if (category._id) {
        const { data } = await instance.patch(
          `/categories/${category._id}`,
          category
        );
        dispatch({ type: "UPDATE_CATEGORY", payload: data.data });
      }
      nav("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  const removeCategory = async (_id: string) => {
    try {
      await instance.delete(`/categories/${_id}`);
      dispatch({ type: "DELETE_CATEGORY", payload: _id });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CategoryContext.Provider
      value={{ state, dispatch, handleCategory, removeCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContextProvider;
