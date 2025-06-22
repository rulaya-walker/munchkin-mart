import React, { useEffect, useState, useCallback } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice';
import { toast } from 'sonner';
const CartContents = ({cart, userId, guestId}) => {
  const dispatch = useDispatch();
  const cartState = useSelector(state => state.cart);
  const [localCart, setLocalCart] = useState(cart);

  // Update local cart when the prop changes
  useEffect(() => {
    if (cart && cart.products) {

      setLocalCart(cart);
    }
  }, [cart]);

  // Update local cart when Redux state changes
  useEffect(() => {
    if (cartState.cart && !cartState.loading) {
      setLocalCart(cartState.cart);
    }
  }, [cartState.cart, cartState.loading]);
  const handleAddToCart = useCallback((productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if(newQuantity <= 0) return; // Prevent quantity from going below 1
    
    // Create a deep copy of the cart for optimistic update
    const updatedCart = JSON.parse(JSON.stringify(localCart));
    const productIndex = updatedCart.products.findIndex(
      p => p.productId === productId && p.size === size && p.color === color
    );
    
    if (productIndex !== -1) {
      updatedCart.products[productIndex].quantity = newQuantity;
      // Update total price
      updatedCart.totalPrice = updatedCart.products.reduce(
        (total, item) => total + (item.price * item.quantity), 0
      );
      setLocalCart(updatedCart);
    }
    
    dispatch(updateCartItemQuantity({
      productId,
      guestId,
      userId,
      quantity: newQuantity,
      size,
      color,
    }))
    .unwrap()
    .then((data) => {
      console.log("Cart update successful:", data);
      toast.success("Cart updated successfully");
    })
    .catch((error) => {
      console.error("Error updating cart:", error);
      toast.error(error.message || "Failed to update cart");
      // Revert to original cart if update fails
      if (cartState.cart) {
        setLocalCart(cartState.cart);
      }
    });
  }, [localCart, dispatch, guestId, userId, cartState.cart]);

  const handleRemoveFromCart = useCallback((productId, size, color) => {
    // Create a deep copy of the cart for optimistic update
    const updatedCart = JSON.parse(JSON.stringify(localCart));
    const productIndex = updatedCart.products.findIndex(
      p => p.productId === productId && p.size === size && p.color === color
    );
    
    if (productIndex !== -1) {
      updatedCart.products.splice(productIndex, 1);
      // Update total price
      updatedCart.totalPrice = updatedCart.products.reduce(
        (total, item) => total + (item.price * item.quantity), 0
      );
      setLocalCart(updatedCart);
    }
    
    dispatch(removeFromCart({
      productId,
      guestId,
      userId,
      size,
      color,
    }))
    .unwrap()
    .then((data) => {
      console.log("Item removed successfully:", data);
      toast.success("Item removed from cart");
    })
    .catch((error) => {
      console.error("Error removing item from cart:", error);
      toast.error(error.message || "Failed to remove item from cart");
      // Revert to original cart if removal fails
      if (cartState.cart) {
        setLocalCart(cartState.cart);
      }
    });
  }, [localCart, dispatch, guestId, userId, cartState.cart]);
  return (
    <div className='p-4 bg-white rounded-lg overflow-auto'>
        <div className='flex-1 overflow-y-auto'>
            <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
            {/* Cart items will go here */}
            {!localCart || !localCart.products || localCart.products.length === 0 ? <p className='text-gray-500'>Your cart is empty.</p> : ""}
        </div>
      {localCart && localCart.products && localCart.products.map((product) => (
        <div key={product.productId} className="flex items-center justify-between py-4 border-b border-gray-200">
          <img src={product.image} alt={product.name} className="h-16 w-16 object-cover mr-4" />
          <div className="flex-1 items-center">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className='text-sm text-gray-500'>
                Size: {product.size} | Color: {product.color}
            </p>
                      <div className='flex items-center space-x-2'>
            <button onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)} className='border rounded px-1 py-0 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer'>
                -
            </button>
            <span className="mx-2">{product.quantity}</span>
            <button onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)} className='border rounded px-1 py-0 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer'>+</button>
            </div>
          </div>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          <button onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)} className="text-red-500 hover:text-red-700 cursor-pointer">
            <RiDeleteBin6Line className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default CartContents