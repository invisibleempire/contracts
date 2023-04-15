import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ClickableSVG = () => {
  const objectRef = useRef<HTMLObjectElement>(null);

  useEffect(() => {
    if (objectRef.current) {
      objectRef.current.addEventListener("load", () => {
        if (objectRef.current && objectRef.current.contentDocument) {
          const svg = d3.select(
            objectRef.current.contentDocument.documentElement
          );

          svg
            .select("#layer4")
            .select("#eastern_australia")
            .style("fill", "black")
            .on("click", handleClick);
        }
      });
    }
  }, [objectRef]);

  const handleClick = (event: MouseEvent, d: any) => {
    const territoryId = (event.target as HTMLElement).id;
    alert(`Clicked on territory ${territoryId}`);
  };

  return (
    <object
      ref={objectRef}
      data="Risk_board.svg"
      type="image/svg+xml"
      className="border border-black m-auto"
    >
      Your browser does not support SVG
    </object>
  );
};

export default ClickableSVG;
