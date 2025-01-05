import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { setShippingAddress } from "../redux/slices/cartSlice";
import Input from "../components/Input";
import Button from "../components/Button";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAddress } = cart;
  const [shipping, setShipping] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    state: shippingAddress?.state || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "",
    phoneNumber: shippingAddress?.phoneNumber || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping((prev) => ({
      ...prev!,
      [name]:
        name === "phoneNumber"
          ? value.startsWith("+")
            ? value
            : "+" + value
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipping.address.trim()) {
      setError("Address is required");
      return;
    }
    if (!shipping.city.trim()) {
      setError("City is required");
      return;
    }
    if (!shipping.state.trim()) {
      setError("State is required");
      return;
    }
    if (
      !shipping.postalCode.trim() ||
      !/^[A-Za-z0-9 -]{4,10}$/.test(shipping.postalCode)
    ) {
      setError("Postal Code is invalid");
      return;
    }
    if (!shipping.country.trim()) {
      setError("Country is required");
      return;
    }
    if (
      !shipping.phoneNumber.trim() ||
      !/^\+\d{7,15}$/.test(shipping.phoneNumber)
    ) {
      setError("Phone number is invalid");
      return;
    }
    setError("");
    dispatch(setShippingAddress(shipping));
    navigate("/order");
  };

  const format = (text: string) =>
    text
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w)/, (char) => char.toUpperCase());

  return (
    <main className="w-full max-w-3xl mx-auto 2xl:mt-16">
      <h1 className="text-core-main font-semibold text-xl mb-6">
        Shipping Details
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1 mb-6">
        {Object.entries(shipping).map(([key, value]) => (
          <Fragment key={key}>
            <label className="text-core-main font-medium">{format(key)}</label>
            <Input
              name={key}
              value={value}
              onChange={(e) => handleChange(e)}
              className="mb-4 !px-2.5 focus:ring ring-core-main transition-all"
            />
          </Fragment>
        ))}
        {error && (
          <p className="text-xs text-center font-semibold text-red-600 mb-2">
            {error}
          </p>
        )}
        <Button value="Continue" className="mt-2" />
      </form>
    </main>
  );
};

export default Shipping;
