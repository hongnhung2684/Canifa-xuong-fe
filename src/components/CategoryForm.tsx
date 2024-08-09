import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import instance from "../apis";
import { Category } from "../interfaces/Category";
import { categorySchema } from "../utils/validation";
import { CategoryContext } from "../contexts/CategoryContext";

const CategoryForm = () => {
  const { id } = useParams();
  const { handleCategory } = useContext(CategoryContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Category>({
    resolver: zodResolver(categorySchema),
  });

  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await instance.get(`/categories/${id}`);
        reset(data.data);
      })();
    }, [id, reset]);
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => handleCategory({ ...data, _id: id }))}
      >
        <h1>{id ? "Edit category" : "Add category"}</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            className="form-control"
            type="text"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-danger">{errors.title.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-danger">{errors.description?.message}</p>
          )}
        </div>

        <div className="mb-3">
          <button className="btn btn-primary w-100">
            {id ? "Edit category" : "Add category"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CategoryForm;
