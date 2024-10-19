import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

const Graph: React.FC = () => {
  const data = [
    { year: "January", count: 10 },
    { year: "February", count: 20 },
    { year: "March", count: 15 },
    { year: "April", count: 25 },
    { year: "May", count: 22 },
    { year: "June", count: 30 },
    { year: "July", count: 28 },
    { year: "August", count: 28 },
    { year: "September", count: 24 },
    { year: "October", count: 20 },
    { year: "November", count: 35 },
    { year: "December", count: 29 },
  ];

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: data.map((row) => row.year),
            datasets: [
              {
                label: "Monthly Expenditures",
                data: data.map((row) => row.count),
                borderColor: "rgb(13 148 136)",
                backgroundColor: "rgb(13 148 136)",
                borderWidth: 1,
                fill: {
                  target: 'origin',
                  above: 'rgba(13, 148, 136, 0.3)',  
                }
              },
            ],
          },
          options: {
            responsive: true,
            aspectRatio: window.innerWidth > 768 ? 15/6 : 16/9,
            maintainAspectRatio: true,
            layout: {
              padding: window.innerWidth > 768 ? 20 : 0,
            },
            scales: {
              x: {
                ticks: {
                  color: "white",
                  font: {
                    size: window.innerWidth > 768 ? 12 : 8
                  }
                },
              },
              y: {
                ticks: {
                  color: "white", 
                  font: {
                    size: window.innerWidth > 768 ? 12 : 8
                  }
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: "white",
                  font: {
                    size: window.innerWidth > 768 ? 16 : 10
                  }
                },
              },
              tooltip: {
                enabled: true,
                intersect: false
              }
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
    <div className="px-4 py-2 sm:px-10 sm:py-6 border-2 border-teal-500 rounded-lg">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Graph;
