import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  CategoryContext,
  CategoryContextType,
} from "../../contexts/CategoryContext";
import { Category } from "../../interfaces/Category";

const CategoryTable = () => {
  const { state, removeCategory } = useContext(CategoryContext);
  console.log(state.categories);

  return (
    <div>
      <h1>Hello, Admin</h1>
      <Link to="/admin/category-add" className="btn btn-success">
        Them danh muc moi
      </Link>
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.categories.map((p: Category) => (
            <tr key={p._id}>
              <td>{p._id}</td>
              <td>{p.title}</td>
              <td>{p.description || "Dang cap nhat"}</td>
              <td>
                <Link
                  to={`/admin/category-edit/${p._id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => removeCategory(p._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
