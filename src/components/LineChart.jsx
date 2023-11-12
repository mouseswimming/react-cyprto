import { Statistic } from "antd";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ coinHistory, currentPrice, periodOption }) {
  const prices = [];
  const timestamps = [];

  coinHistory.forEach((coin) => {
    prices.push(coin[1]);

    const timestamp = coin[0];

    switch (periodOption) {
      case "1":
        timestamps.push(moment(timestamp).format("h:mm A"));
        break;
      case "365":
        timestamps.push(moment(timestamp).format("MMM D, YYYY"));
        break;
      default:
        timestamps.push(moment(timestamp).format("MMM D"));
        break;
    }
  });

  const TICK_LIMITS = {
    1: 12,
    7: 8,
    30: 11,
    90: 9,
    365: 13,
  };

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Price",
        data: prices,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
      x: {
        ticks: {
          maxTicksLimit: TICK_LIMITS[periodOption],
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <section className="mb-8">
      <Statistic
        title="Current Price"
        prefix="$"
        value={currentPrice}
        precision={2}
        className="mb-4"
      />
      <Line data={data} options={options} />
    </section>
  );
}
