import classes from "./FormTitle.module.scss";

const FormTitle: React.FC<{ children: string }> = ({ children }) => {
  return <h1 className={classes.formTitle}>{children}</h1>;
};

export default FormTitle;
