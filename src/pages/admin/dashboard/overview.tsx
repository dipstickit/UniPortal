import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "2012",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2011",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2012",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2013",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2014",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2015",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2016",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2017",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2018",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2019",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2020",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2021",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2022",
    total: Math.floor(Math.random() * 5000) + 1000,
  },

]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value : string) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}