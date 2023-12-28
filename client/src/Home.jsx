import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/items");
      const itemsWithId = response.data.map((item) => ({
        ...item,
        id: item._id, // Add MongoDB id as 'id' property
      }));
      setItems(itemsWithId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      if (
        typeof a[sortConfig.key] === "number" &&
        typeof b[sortConfig.key] === "number"
      ) {
        return a[sortConfig.key] - b[sortConfig.key];
      } else if (
        typeof a[sortConfig.key] === "string" &&
        typeof b[sortConfig.key] === "string"
      ) {
        return a[sortConfig.key].localeCompare(b[sortConfig.key]);
      }
    } else if (sortConfig.direction === "desc") {
      if (
        typeof a[sortConfig.key] === "number" &&
        typeof b[sortConfig.key] === "number"
      ) {
        return b[sortConfig.key] - a[sortConfig.key];
      } else if (
        typeof a[sortConfig.key] === "string" &&
        typeof b[sortConfig.key] === "string"
      ) {
        return b[sortConfig.key].localeCompare(a[sortConfig.key]);
      }
    }
    return 0;
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center m-8">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <Link
          to="/form"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New Item
        </Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleSort("id")}
              >
                Item ID{" "}
                {sortConfig.key === "id" &&
                  sortConfig.direction === "asc" &&
                  "▲"}
                {sortConfig.key === "id" &&
                  sortConfig.direction === "desc" &&
                  "▼"}
              </button>
            </th>
            <th className="px-4 py-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortConfig.key === "name" &&
                  sortConfig.direction === "asc" &&
                  "▲"}
                {sortConfig.key === "name" &&
                  sortConfig.direction === "desc" &&
                  "▼"}
              </button>
            </th>
            <th className="px-4 py-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleSort("buyer")}
              >
                Buyer{" "}
                {sortConfig.key === "buyer" &&
                  sortConfig.direction === "asc" &&
                  "▲"}
                {sortConfig.key === "buyer" &&
                  sortConfig.direction === "desc" &&
                  "▼"}
              </button>
            </th>
            <th className="px-4 py-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleSort("price")}
              >
                Price{" "}
                {sortConfig.key === "price" &&
                  sortConfig.direction === "asc" &&
                  "▲"}
                {sortConfig.key === "price" &&
                  sortConfig.direction === "desc" &&
                  "▼"}
              </button>
            </th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.itemId}>
              <td className="border px-4 py-2">{item.itemId}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.buyer}</td>
              <td className="border px-4 py-2">{item.price}</td>
              <td className="border px-4 py-2">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                  <Link to={`/editForm/${item._id}`}>Edit</Link>
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
