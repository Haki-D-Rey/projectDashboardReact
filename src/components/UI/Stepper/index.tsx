import { FC, createContext, useState, useContext, useEffect, Children } from 'react';

export interface IStepProps {
  index: number;
  Icon?: React.FunctionComponent<any>;
  clickable?: boolean;
  className?: string;
  btnClass?: string;
  btnClassActive?: string;
  btnClassInactive?: string;
  children?: React.ReactNode;
}

export interface IStepperProps {
  children?: React.ReactNode;
  onChange?: (step: number) => void;
  value?: number;
  clickable?: boolean;
  className?: string;
}

interface IStepperContext {
  steps: number;
  active: number;
  handleClick: (index: number) => void;
  clickable: boolean;
}

const StepperContext = createContext<IStepperContext>({
  steps: 0,
  active: 0,
  handleClick: () => ({}),
  clickable: false,
});

const Stepper: FC<IStepperProps> = ({ children, value, onChange, clickable = false, className }) => {
  const steps = Children.count(children);
  const [active, setActive] = useState<number>(0);

  const handleClick = (index: number) => {
    setActive(index);
    onCheckIconToDoListStep(index);
    if (onChange) {
      onChange(index);
    }
  };

  const onCheckIconToDoListStep = (index: number) => {
    const stepInfos = document.querySelectorAll('.step-info');
    stepInfos[0].classList.remove('remove');
    if (!stepInfos[0].classList.contains('changed') && index === 1) {
      stepInfos[0].classList.toggle('changed');
    }

    if (stepInfos[0].classList.contains('changed') && index === 0) {
      stepInfos[0].classList.toggle('remove');
    }
  };

  useEffect(() => {
    if (value && value !== active) {
      setActive(value);
    }
  }, [value]);

  return (
    <StepperContext.Provider value={{ active, handleClick, steps, clickable }}>
      <ul className={'steps ' + className + 'border-2 border-red-700'}>
        {Children.map(children, (child) => (
          <>{child}</>
        ))}
      </ul>
    </StepperContext.Provider>
  );
};

const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepperContext must be used within a Stepper');
  }
  return context;
};

const Step: FC<IStepProps> = ({ children, index, Icon, clickable = false }) => {
  const { active, handleClick, steps, clickable: allClickable } = useStepperContext();

  const borderColorPassed = active >= index ? 'step-neutral' : 'border-gray-300';

  return (
    <li
      className={`step ${borderColorPassed} ${clickable || allClickable ? 'cursor-pointer' : 'cursor-auto'}`}
      onClick={allClickable || clickable ? () => handleClick(index) : undefined}>
      {children}
    </li>
  );

  /* return (
    <>
      <button
        onClick={
          allClickable || clickable ? () => handleClick(index) : undefined
        }
        className={` flex items-center ${isActive ? "text-white" : textColor} ${
          !clickable && "cursor-auto"
        } relative`}
      >
        <div
          className={`h-12 w-12 rounded-full py-3 transition duration-500 ease-in-out  ${borderColor} ${backgroundColor} flex items-center justify-center`}
        >
          {Icon && <Icon className="text-2xl " />}
        </div>
        <div className="absolute top-0 -ml-10 mt-14 w-32 text-center text-xs font-medium text-gray-400">
          {label}
        </div>
      </button>
      {index < steps - 1 && (
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${borderColorPassed}`}
        />
      )}
    </>
  );*/
};

function rswitch(param: number, cases: { [key: number]: React.ReactNode }, defaultCase?: React.ReactNode) {
  if (cases[param]) {
    return cases[param];
  } else {
    return defaultCase || <span className="text-red-500">No found</span>;
  }
}

export { Step, rswitch };
export default Stepper;
