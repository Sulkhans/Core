import { CartItem } from "../../types/types";

type Props = {
  items: CartItem[];
};

const OrderSummary = ({ items }: Props) => {
  return (
    <>
      <h2 className="font-semibold text-lg ml-2 text-core-main md:!mt-4">
        Order summary
      </h2>
      <div className="px-6 py-4 rounded-2xl bg-core-white font-medium">
        <table className="font-medium border-separate border-spacing-y-2">
          <tbody>
            <tr>
              <td className="w-[154px] font-semibold text-core-main">
                Total Items
              </td>
              <td>{items.reduce((acc, item) => acc + item.quantity, 0)}</td>
            </tr>
            <tr>
              <td className="font-semibold text-core-main">Total Price</td>
              <td>
                {items.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderSummary;
