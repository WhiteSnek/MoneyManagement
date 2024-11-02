import React, { useRef, useEffect, useState, useMemo } from "react";
import { Chart } from "chart.js/auto";
import { useGraph } from "../../../providers/GraphProvider"; 
import { productCategories } from "../../../constants/categories";
import { useCurrency } from "../../../providers/CurrencyProvider";
import { convertCurrency } from "../../../utilityFunctions/currencyUtilities";
import Select from "../../utils/Form/Select";

const RadarGraph: React.FC = () => {
  const { Graph } = useGraph(); 
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [dataType, setDataType] = useState<"amount" | "price">("amount");
  const {currency} = useCurrency()

  const data = useMemo(() => {
    return productCategories.map((category) => {
      const categoryData = Graph.category.find((cat) => cat.name === category);
      const value = dataType === "amount" ? categoryData?.count : categoryData?.price;

      return dataType === "amount" ? value || 0 : value ? convertCurrency(value, currency.code) : 0;
    });
  }, [dataType, Graph.category, currency]);

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
                label: dataType === "amount" ? "Monthly Count" : "Monthly Expenditures",
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
                display: false,
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
  }, [data, dataType]); 

  return (
    <div className="px-4 sm:px-10 py-4 ml-4">
      <div className="mb-4">
      <Select title="Select Basis:" value={dataType} onChange={(e) => setDataType(e.target.value as "amount" | "price")} options={[{label: "Amount", value: "amount"}, {label: "Price",value: "price"}]} className="bg-zinc-900" />
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default RadarGraph;
