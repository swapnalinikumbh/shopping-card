import React, { useState } from "react";
import "./styles.css";
function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddItem = (item) => {
    const newItems = [...items, item];
    setItems(newItems);
    setShowForm(false);
    setSelectedItem(null);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleEditItem = (index) => {
    const item = items[index];
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleUpdateItem = (index, updatedItem) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    setItems(newItems);
    setShowForm(false);
    setSelectedItem(null);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setSelectedItem(null);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setSelectedItem(null);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemoveItem(index)}>Remove</button>
            <button onClick={() => handleEditItem(index)}>Edit</button>
          </li>
        ))}
      </ul>
      {items.length === 0 && <p>Your cart is empty.</p>}
      {!showForm && <button onClick={handleShowForm}>Add Item</button>}
      {showForm && (
        <AddItemForm
          selectedItem={selectedItem}
          onSave={selectedItem ? handleUpdateItem : handleAddItem}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

function AddItemForm({ selectedItem, onSave, onCancel }) {
  const [name, setName] = useState(selectedItem ? selectedItem.name : "");
  const [price, setPrice] = useState(selectedItem ? selectedItem.price : "");

  const handleSubmit = (event) => {
    event.preventDefault();
    const item = { name, price: parseFloat(price) };
    onSave(item);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="text"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>
      <button type="submit">{selectedItem ? "Save" : "Add Item"}</button>
      {selectedItem && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

function App() {
  return (
    <div>
      <h1>My Shopping App</h1>
      <ShoppingCart />
    </div>
  );
}

export default App;
