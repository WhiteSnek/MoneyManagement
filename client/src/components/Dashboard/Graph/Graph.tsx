import React, { useRef, useEffect, useState, useMemo } from "react";
import { Chart } from "chart.js/auto";
import { useGraph } from "../../../providers/GraphProvider";
import { months } from "../../../constants/months";
import { useCurrency } from "../../../providers/CurrencyProvider";
import { convertCurrency } from "../../../utilityFunctions/currencyUtilities";
import Select from "../../utils/Form/Select";

const Graph: React.FC = () => {
  const [dataType, setDataType] = useState<"amount" | "price">("amount");
  const { Graph } = useGraph();
  const { currency } = useCurrency();

  const data = useMemo(() => {
    return months.map((month) => {
      const monthData = Graph.month.find((cat) => cat.name === month);
      const value = dataType === "amount" ? monthData?.count : monthData?.price;

      return dataType === "amount" ? value || 0 : value ? convertCurrency(value, currency.code) : 0;
    });
  }, [dataType, Graph.month, currency]);

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: months,
            datasets: [
              {
                label: "Monthly Expenditures",
                data: data,
                borderColor: "rgb(13, 148, 136)",
                backgroundColor: "rgba(13, 148, 136, 0.3)",
                borderWidth: 1,
                fill: {
                  target: "origin",
                  above: "rgba(13, 148, 136, 0.3)",
                },
              },
            ],
          },
          options: {
            responsive: true,
            aspectRatio: window.innerWidth > 768 ? 15 / 6 : 16 / 9,
            maintainAspectRatio: true,
            layout: {
              padding: window.innerWidth > 768 ? 20 : 0,
            },
            scales: {
              x: {
                ticks: {
                  color: "white",
                  font: {
                    size: window.innerWidth > 768 ? 12 : 8,
                  },
                },
              },
              y: {
                ticks: {
                  color: "white",
                  font: {
                    size: window.innerWidth > 768 ? 12 : 8,
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
                intersect: false,
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
    <div className="px-4 py-2 sm:px-10 sm:py-6 border-2 border-teal-500 rounded-lg">
      <div className="mb-4">
        <Select title="Select Basis:" value={dataType} onChange={(e) => setDataType(e.target.value as "amount" | "price")} options={[{label: "Amount", value: "amount"}, {label: "Price",value: "price"}]} />
        
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Graph;
