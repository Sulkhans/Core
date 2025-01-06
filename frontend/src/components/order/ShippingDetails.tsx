const ShippingDetails = ({ shippingAddress }: any) => {
  const format = (text: string) =>
    text
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w)/, (char) => char.toUpperCase());
  return (
    <>
      <h2 className="font-semibold text-lg ml-2 text-core-main">
        Shipping Details
      </h2>
      <div className="px-6 py-4 rounded-2xl bg-core-white font-medium">
        <table>
          <tbody>
            {Object.entries(shippingAddress).map(([key, value]) => (
              <tr key={key} className="*:py-2">
                <td className="pr-8 text-core-main font-semibold">
                  {format(key)}
                </td>
                <td>{value as string}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShippingDetails;
