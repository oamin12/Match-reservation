import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import AddBlogForm from "./AddBlogForm";
import classes from "./adminblog.module.css"


const AdminBlogs = () => {


  return (
    <>
      <div className={classes.container}>
        <AddBlogForm />
      </div>
    </>
  );
};

export default AdminBlogs;
