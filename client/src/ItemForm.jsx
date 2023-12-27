import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ItemForm = () => {
  const [data, setData] = useState({
    itemId: "",
    name: "",
    buyer: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/items";
      const { data: res } = await axios.post(url, data);
      setMsg("Item created", res.message);
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
            Add a new item
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Id"
                  name="itemId"
                  onChange={handleChange}
                  value={data.itemId}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Name "
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Buyer"
                  name="buyer"
                  onChange={handleChange}
                  value={data.buyer}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  onChange={handleChange}
                  value={data.price}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full mb-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>

          {msg && (
            <div className="w-full flex justify-center mt-4 py-2 px-4  rounded-md shadow-sm text-sm font-medium border border-green-600  text-white bg-green-500   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-green-700 ">
              {msg}
            </div>
          )}
          {error && (
            <div className="w-full flex justify-center mt-4 py-2 px-4  rounded-md shadow-sm text-sm font-medium border border-red-600  text-white bg-red-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-red-700 ">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
