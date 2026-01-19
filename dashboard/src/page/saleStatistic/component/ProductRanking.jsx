import { formatPrice } from "../../../utility/format";

const ProductRanking = ({ data }) => {
  return (
    <div className="flex-1 overflow-x-auto">
      <table className="w-full text-left text-sm">
        {/* HEADER */}
        <thead className="bg-slate-50 font-medium text-gray-500">
          <tr>
            <th className="w-16 px-6 py-3">Rank</th>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3 text-right">Units</th>
            <th className="px-6 py-3 text-right">Revenue</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-slate-100">
          {data.map((p, index) => (
            <tr key={p.productId} className="transition-colors hover:bg-slate-50">
              {/* Rank */}
              <td className="px-6 py-4 font-bold text-gray-400">#{index + 1}</td>

              {/* Product */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-slate-100">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  </div>

                  <div>
                    <p className="max-w-[150px] truncate font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.brand}</p>
                  </div>
                </div>
              </td>

              {/* Units */}
              <td className="px-6 py-4 text-right text-gray-600">{p.sale}</td>

              {/* Revenue */}
              <td className="px-6 py-4 text-right font-medium text-gray-900 tabular-nums">{formatPrice(p.revenue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductRanking;
