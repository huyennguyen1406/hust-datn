import { formatPrice } from "../../../utility/format";

const BrandRanking = ({ data }) => {
  return (
    <div className="flex-1 overflow-x-auto">
      <table className="w-full text-left text-sm">
        {/* HEADER */}
        <thead className="bg-slate-50 font-medium text-gray-500">
          <tr>
            <th className="w-16 px-6 py-3">Rank</th>
            <th className="px-6 py-3">Brand</th>
            <th className="px-6 py-3 text-right">Revenue</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-slate-100">
          {data.map((b, index) => (
            <tr key={b.brandName} className="transition-colors hover:bg-slate-50">
              {/* Rank */}
              <td className="px-6 py-4 font-bold text-gray-400">#{index + 1}</td>

              {/* Brand */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-slate-100">
                    <img src={b.logo} alt={b.brandName} className="h-full w-full object-contain" />
                  </div>

                  <p className="font-medium text-gray-900">{b.brandName}</p>
                </div>
              </td>

              {/* Revenue */}
              <td className="px-6 py-4 text-right font-medium text-gray-900 tabular-nums">{formatPrice(b.revenue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandRanking;
