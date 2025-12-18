const CheckoutItem = ({ item }) => {
  return (
    <li className="flex py-4">
      {/* Product image */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
      </div>

      {/* Info */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between font-medium">
          <h3>{item.name}</h3>
          <p>{item.subTotal.toLocaleString()}₫</p>
        </div>

        <p className="text-sm text-gray-500">
          Size: {item.size}, Qty: {item.quantity}
        </p>
      </div>
    </li>
  );
};

export default CheckoutItem;
