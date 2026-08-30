import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedNodes, setAddedNodes] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        { name: 'Snake Plant', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?w=300', description: 'Produces oxygen at night.', cost: '$15' },
        { name: 'Spider Plant', image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300', description: 'Filters toxins from air.', cost: '$12' },
        { name: 'Peace Lily', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=300', description: 'Purifies indoor environment.', cost: '$18' },
        { name: 'Boston Fern', image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300', description: 'Increases indoor humidity.', cost: '$14' },
        { name: 'Rubber Plant', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300', description: 'Removes indoor pollutants.', cost: '$20' },
        { name: 'Aloe Vera', image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300', description: 'Medicinal and air purifying.', cost: '$10' },
      ],
    },
    {
      category: 'Aromatic Plants',
      plants: [
        { name: 'Lavender', image: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=300', description: 'Calming aroma.', cost: '$16' },
        { name: 'Rosemary', image: 'https://images.unsplash.com/photo-1515586000433-a5bc720b3604?w=300', description: 'Fresh culinary fragrance.', cost: '$11' },
        { name: 'Mint', image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=300', description: 'Invigorating mint scent.', cost: '$9' },
        { name: 'Jasmine', image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=300', description: 'Sweet relaxing scent.', cost: '$22' },
        { name: 'Lemon Balm', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300', description: 'Refreshing citrus note.', cost: '$13' },
        { name: 'Eucalyptus', image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=300', description: 'Clear refreshing fragrance.', cost: '$25' },
      ],
    },
    {
      category: 'Low Light Plants',
      plants: [
        { name: 'ZZ Plant', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=300', description: 'Thrives in dark spaces.', cost: '$24' },
        { name: 'Cast Iron Plant', image: 'https://images.unsplash.com/photo-1604762524889-3e2fccbc23ce?w=300', description: 'Extremely durable.', cost: '$28' },
        { name: 'Pothos', image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=300', description: 'Easy vine for shade.', cost: '$12' },
        { name: 'Chinese Evergreen', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300', description: 'Variegated shade foliage.', cost: '$19' },
        { name: 'Dracaena', image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=300', description: 'Hardy indoor classic.', cost: '$21' },
        { name: 'English Ivy', image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=300', description: 'Trailing low light plant.', cost: '$14' },
      ],
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedNodes((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div className="product-page">
      <nav className="navbar">
        <h2 onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>
          Paradise Nursery
        </h2>
        <div className="nav-links">
          <button onClick={() => setShowCart(false)}>Plantas</button>
          <button onClick={() => setShowCart(true)} className="cart-btn">
            🛒 Carrito ({totalCartCount})
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-container">
          {plantsArray.map((categoryObj, idx) => (
            <div key={idx} className="category-section">
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="plants-grid">
                {categoryObj.plants.map((plant, pIdx) => (
                  <div key={pIdx} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-img" />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <span className="plant-cost">{plant.cost}</span>
                    <button
                      className="add-btn"
                      disabled={!!addedNodes[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedNodes[plant.name] ? 'Agregado' : 'Agregar al Carrito'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
