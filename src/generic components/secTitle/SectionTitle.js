import classes from "./sectiontitle.module.css";

const SectionTitle = (props) => {
  return (<>
      <h2 className={classes.sectionTitle}>{props.title}</h2>
    </>
  );
};

export default SectionTitle;
