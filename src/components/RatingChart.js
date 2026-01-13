import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function RatingChart({ feedbacks }) {
  const counts = [1,2,3,4,5].map(
    n => feedbacks.filter(f => f.rating === n).length
  );

  return (
    <Bar
      data={{
        labels: ["1★","2★","3★","4★","5★"],
        datasets: [{
          label: "Ratings Count",
          data: counts,
          backgroundColor: "#007bff"
        }]
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }}
    />
  );
}
