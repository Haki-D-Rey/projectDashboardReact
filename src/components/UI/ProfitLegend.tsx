import React from "react";

interface basedProps {
  isCofounder: boolean;
}
interface LegendItemProps extends basedProps {
  itemList: string [];
}

function LegendItem({ itemList, isCofounder }: LegendItemProps) {
  const [color, setColors] = React.useState<string[]>(['#2FD1CD', '#FF981D', '#1A77B5']);

  return (
    <div className={`flex ${!isCofounder ? 'lg:h-[100px] xl:h-[120px] 2xl:py-1 lg:w-full' : 'h-[140px] lg:w-[300px]'} justify-center rounded-3xl bg-secondary md:text-sm`}>
      <ul className="relative lg:ml-0 xl:ml-4 flex w-[full%] flex-col items-start justify-evenly pl-6 text-white">
        {itemList.map((item, index) => (
          <li key={index} className={`relative text-center ${!isCofounder ? 'text-md lg:text-md xl:text-[16px] lg:pl-2 xl:pl-0' : 'text-lg'}`}>
            <span style={{ backgroundColor: color[index] }} className={`absolute ${!isCofounder ? 'lg:h-[20px] lg:w-[20px] lg:-left-[20px] lg:top-0 xl:-left-[30px] xl:-top-1- xl:h-[20px] xl:w-[20px] 2xl:w-[30px] 2xl:h-[30px] 2xl:-left-[42px] 2xl:-top-1' : 'h-[20px] w-[20px] -left-[28px]'} rounded-full`}></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ProfitCardProps extends basedProps {
  name: string;
  profit: string;
}

function ProfitCard({name, profit, isCofounder} : ProfitCardProps) {
  return (
    <div className={`${!isCofounder ? 'lg:h-[100px] lg:py-2 lg:w-full xl:h-[120px] xl:w-full' : ' h-[140px] lg:w-[300px]'} flex justify-center items-center rounded-3xl bg-secondary`}>
      <div className="mx-auto flex flex-col xl:gap-2 px-4 text-center text-xl font-semibold">
        <p className="w-full lg:text-lg xl:text-xl 2xl:text-3xl text-white">{name}</p> 
        <span className={`text-center ${!isCofounder ? 'lg:text-2xl xl:text-4xl 2xl:text-5xl text-white' : 'text-5xl text-[#43C840]'} font-semibold`}>$ {profit}</span>
      </div>
    </div>
  );
}

export {LegendItem, ProfitCard};