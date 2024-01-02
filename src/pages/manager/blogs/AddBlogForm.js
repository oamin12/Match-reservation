import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import classes from "./addblogform.module.css";
import GenericForm from "../../../generic components/generic form/GenericForm";

const AddBlogForm = () => {
  const array = [
    {
      label: "title",
      name: "title",
      type: "text",
      regex: "[a-zA-Z]+",
      required: true,
    },
    {
      label: "content",
      name: "content",
      type: "text",
      regex: "[a-zA-Z]+",
      class: "field",
      required: true,
    },
    {
      label: "publish date",
      name: "publishDate",
      type: "date",
      required: true,
    },
    {
      label: "publish",
      name: "publish",
      type: "checkbox",
      required: true,
    },
    {
      label: "homepage",
      name: "homepage",
      type: "checkbox",
      required: true,
    },
    {
      label: "featured",
      name: "featured",
      type: "checkbox",
      required: true,
    },
  ];

  return (
    <div className={classes.container}>
      <GenericForm arr={array} />
    </div>
  );
};

export default AddBlogForm;
