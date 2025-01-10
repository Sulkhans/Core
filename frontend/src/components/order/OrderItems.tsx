import { Link } from "react-router-dom";
import { BASE_URL } from "../../redux/constants";
import { CartItem } from "../../types/types";

type Props = {
  items: CartItem[];
};

const OrderItems = ({ items }: Props) => {
  return (
    <section>
      <h2 className="font-semibold text-lg mb-3 ml-2 text-core-main">
        Products
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className="flex items-center p-3 gap-4 rounded-2xl bg-core-white text-core-main"
          >
            <img
              src={BASE_URL + item.images[0]}
              className="size-[4.5rem] p-1.5"
            />
            <div className="font-semibold">
              <h2 className="font-semibold text-pretty line-clamp-2">
                {item.name}
              </h2>
              <p className="font-sintony">
                <span>$</span>
                {item.price}
                <span className="ml-1.5">× {item.quantity}</span>
              </p>
            </div>
            <div className="min-w-[5.5rem] py-2 rounded-full bg-core-main text-center content-center ml-auto mr-4 font-sintony font-semibold text-white">
              <span className="mr-0.5">$</span>
              <span>{item.price * item.quantity}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OrderItems;
