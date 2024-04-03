"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/heading";
import Header from "./components/Header";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div>
      <Heading
        title="ELearning"
        description="Elevate your programming skills with our cutting-edge eLearning web app. Dive into interactive coding courses, access extensive programming resources, and master the art of computer programming at your own pace."
        keywords="Computer programming, Coding courses, Programming tutorials, Software development, Code learning platform, Programming languages, Web development, Mobile app development, Python programming, Java programming"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
    </div>
  );
};

export default Page;
