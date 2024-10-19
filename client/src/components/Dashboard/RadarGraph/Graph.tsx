import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { productCategories } from "../../../constants/categories";

const RadarGraph: React.FC = () => {
  const data = [2, 4, 6, 5, 3, 0, 3, 2];
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: "radar",
          data: {
            labels: productCategories,
            datasets: [
              {
                label: "Monthly Expenditures",
                data: data,
                backgroundColor: "rgba(13, 148, 136, 0.3)", 
                borderColor: "rgba(13, 148, 136, 1)", 
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(255, 99, 132, 1)", 
                borderWidth: 1, 
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1 / 1,
            scales: {
              r: {
                ticks: {
                  display: false, 
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.2)", 
                },
                angleLines: {
                  color: "rgba(255, 255, 255, 0.5)", 
                },
              },
            },
            plugins: {
              legend: {
                display: true, 
                labels: {
                  color: "#fff", 
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.label}: ${context.raw}`;
                  },
                },
                backgroundColor: "rgba(0,0,0,0.7)", 
                titleColor: "#fff", 
                bodyColor: "#fff", 
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="px-10 py-4 border-2 border-teal-500 rounded-lg ml-4">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default RadarGraph;
