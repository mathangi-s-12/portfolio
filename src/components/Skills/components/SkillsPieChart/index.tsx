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
  const options = {
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
      headerFormat: "{point.name}",
      pointFormat: `<br/>Years of experience: {point.custom.years}<br/>Skill Level: <span style="color:{point.color}">\u25CF</span> {point.custom.level}`,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      variablepie: {
        dataLabels: {
          enabled: true,
          useHTML: true,
          format: `<img src={point.custom.logo} alt={point.name} style="min-width:30px;" />`,
        },
      },
    },
    series: [
      {
        minPointSize: 10,
        innerSize: "10%",
        zMin: 2, // Minimum value for z axis (skill level)
        yMin: 0.5, // Minimum value for y axis (years of experience)
        name: title,
        data: data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SkillChart;
