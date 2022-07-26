import React from "react";
import Block from "../components/studio/Block";

function useDND({ data }: { data: { name: string; imageSrc: string }[] }) {
  const Draggables = () => {
    return data.map(({ name, imageSrc }) => {
      return <Block id={name} key={name} />;
    });
  };

  const DropZone = () => {};

  return { Draggables };
}
