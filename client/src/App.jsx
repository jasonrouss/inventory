import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import ItemForm from "./ItemForm";
import EditForm from "./EditForm";

function App() {
  return (
    <div className="mont">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/form" exact element={<ItemForm />} />
        <Route path="/editform/:id" exact element={<EditForm />} />
      </Routes>
    </div>
  );
}

export default App;
