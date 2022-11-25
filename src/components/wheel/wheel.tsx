import { getFinishBasisPosition, getStartBasisPosition } from "../../utils/angle";
import { useEffect, useLayoutEffect, useRef } from "react";

import Block from "./wheel.styled";
import DATA from "../../data/data";
import Point from "../point/point";
import gsap from "gsap";

type WheelProps = {
  currentIndex: number;
  handleChangeCurrentIndex: (index: number) => void;
}

function Wheel({currentIndex, handleChangeCurrentIndex}: WheelProps) {
  const basisRef = useRef<any>();

  function usePreviousValue(value: any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevIndex = usePreviousValue(currentIndex) || 0;
  
  useLayoutEffect(() => {
    const basisRotation = gsap.context(() => {
      gsap.fromTo(basisRef.current, {
        rotation: getStartBasisPosition(prevIndex)
      },
      {
        duration: 1, 
        rotation: getFinishBasisPosition(prevIndex, currentIndex)
      })
    }, basisRef);

    return () => basisRotation.revert();
  }, [currentIndex, prevIndex]);

  return (
    <Block>
      <Block.Basis ref={basisRef}>
        {DATA.map((item, index) => (
          <Point key={index} item={item} currentIndex={currentIndex} handleChangeCurrentIndex={handleChangeCurrentIndex} />
        ))}
      </Block.Basis>
    </Block>
  )
}

export default Wheel;