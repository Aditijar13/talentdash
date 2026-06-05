interface StatCardProps {
  label: string
  value: string
  sub?: string
  accent?: boolean
  trend?: { value: string; positive: boolean }
}

export default function StatCard({ label, value, sub, accent, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#EBEBEB] p-5 flex flex-col gap-1 shadow-sm">
      <p className="text-[12px] font-medium text-[#717171] uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold leading-tight ${accent ? 'text-[#0369A1]' : 'text-[#222222]'}`}>
        {value}
      </p>
      {sub && <p className="text-[13px] text-[#717171]">{sub}</p>}
      {trend && (
        <div className={`flex items-center gap-1 text-[12px] font-semibold mt-1 ${trend.positive ? 'text-[#008A05]' : 'text-[#D93025]'}`}>
          <span>{trend.positive ? '▲' : '▼'}</span>
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  )
}
