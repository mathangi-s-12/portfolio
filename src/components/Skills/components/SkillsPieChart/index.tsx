import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import VariablePie from "highcharts/modules/variable-pie";

if (!Highcharts.Chart.prototype.addSeries) {
  // @ts-expect-error: Common issue with Highcharts modules and TypeScript
  VariablePie(Highcharts);
}

interface VariablePieDataPoint {
  name: string;
  y: number; // years of experience
  z: number; // skill level
  color?: string;
}

interface VariablePieChartProps {
  title: string;
  data: VariablePieDataPoint[];
}

const SkillChart = ({ title, data }: VariablePieChartProps) => {
  const options: Highcharts.Options = {
    chart: {
      type: "variablepie",
      backgroundColor: "transparent",
    },
    title: {
      text: title,
      style: {
        color: "var(--text-color)",
      },
    },
    tooltip: {
      headerFormat: "<b>{point.name}</b>",
      pointFormat: `<br/>Years of experience: {point.custom.years}<br/>Skill Level: <span style="color:{point.color}">\u25CF</span> {point.custom.level}`,
      followPointer: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      variablepie: {
        dataLabels: {
          alignTo: "plotEdges",
          enabled: true,
          useHTML: true,
          format: `<img src={point.custom.logo} alt={point.name} style="min-width:{point.custom.logoWidth};" />`,
          padding: 0,
        },
        startAngle: 70,
      },
    },
    series: [
      {
        type: "variablepie",
        minPointSize: 10,
        innerSize: "20%",
        zMin: 2, // Minimum value for z axis (skill level)
        name: title,
        data: data,
      },
    ],
  };

  return (
    <div className="h-[400px]">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SkillChart;
