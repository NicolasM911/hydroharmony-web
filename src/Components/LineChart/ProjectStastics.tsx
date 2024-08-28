import React, { useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts"; // Importa ApexCharts

const ProjectStastics: React.FC = () => {
  const options: ApexOptions = {
    series: [
      {
        name: "Developer Edition",
        data: [5, 10, 14, 18, 25, 20],
        color: "#1A56DB",
      },
      {
        name: "Designer Edition",
        data: [14, 26, 34, 40, 52, 60],
        color: "#7E3BF2",
      },
    ],
    chart: {
      height: "100%",
      width: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "light",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    xaxis: {
      categories: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
      labels: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      labels: {
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
  };

  const chartRef = useRef<HTMLDivElement | null>(null); // Tipo específico para el ref

  useEffect(() => {
    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [options]);

  return (
    <div>
      <div className="w-full bg-white rounded-xl p-4 md:p-6">
        <div className="flex justify-between">
          <div>
            <h5 className="leading-none text-3xl font-bold text-red-500 dark:text-red-400 pb-2">
              Project Stastics
            </h5>
          </div>
          <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
            23%
            <svg
              className="w-3 h-3 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
          </div>
        </div>
        <div ref={chartRef} id="data-series-chart"></div>
      </div>
    </div>
  );
};

export default ProjectStastics;
