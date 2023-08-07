import dynamic from "next/dynamic";
import { IResponsiveLine, ILineColors } from "@/api/types/util";

import { useIsMobileOrTablet } from "@/hooks/useMediaQuery.hook";

const ResponsiveLine = dynamic(() => import("@nivo/line").then(m => m.ResponsiveLine), { ssr: false });

interface ResponsiveProp {
  data: IResponsiveLine[];
  tickValues: any[];
  nMax: number;
  nMin?: number;
  lineColors: ILineColors;
}

export default function Index({ data, tickValues, nMax, nMin, lineColors } : ResponsiveProp) {
  const isMobileOrTablet = useIsMobileOrTablet();

  const isSmall = () : number => {
    return isMobileOrTablet ? 15 : 20;
  }
  
  return (
    <div className="h-full w-full">
      <ResponsiveLine
        data={data}
        theme={{
          textColor: '#808080',
          fontSize: isSmall(),
        }}
        margin={{ top: 10, right: 20, bottom: 40, left: 70 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: nMin ? nMin : 0,
          max: nMax,
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 2,
          tickPadding: 11,
          tickRotation: 0,
          legendOffset: -43,
          legendPosition: 'middle',
          tickValues: tickValues,
        }}
        // @ts-ignore
        colors={(serie) => lineColors[serie.id]}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        pointSize={7}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaBaselineValue={0}
        enableSlices="x"
        useMesh={true}
      />
    </div>
  );
}
