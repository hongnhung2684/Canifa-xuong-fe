import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  ProductContext,
  ProductContextType,
} from "../../contexts/ProductContext";

const Dashboard = () => {
  const { state, handleRemove } = useContext(
    ProductContext
  ) as ProductContextType;

  return (
    <div className="container">
      <h2>Hello, Admin</h2>
      <Link to={`/admin/product-add`} className="btn btn-success">
        Add new Product
      </Link>
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>{item.category?.title}</td>

              <td>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
                <Link
                  to={`/admin/product-edit/${item._id}`}
                  className="btn btn-warning"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
