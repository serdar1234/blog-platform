import {
  FieldErrors,
  useFieldArray,
  Control,
  FieldValues,
  UseFormRegister,
  SetValueConfig,
} from "react-hook-form";

import InputField from "../Input";
import { Button } from "@mui/material";
import classes from "./FieldArray.module.scss";

const FieldArray: React.FC<{
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  setValue: (name: string, value: unknown, config?: SetValueConfig) => void;
  errors: FieldErrors<FieldValues>;
}> = ({ control, register, setValue, errors }) => {
  const { fields, append, remove } = useFieldArray({
    name: "tagList",
    control,
  });

  const handleChange = (n: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(n, e.target.value.trimStart());
  };

  return (
    <>
      <label>Tags</label>
      {fields.map((field, index, array) => {
        return (
          <div key={field.id} className={classes.tagsDiv}>
            <InputField
              name={`tagList.${index}.tag`}
              fullWidth={false}
              label=""
              register={register}
              errors={errors}
              placeholder="tag"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(`tagList.${index}.tag`, e)
              }
            />
            <Button
              variant="outlined"
              type="button"
              disableElevation
              onClick={() => {
                if (array.length == 1) {
                  console.log(132131);
                  setValue(`tagList.0.tag`, "");
                } else remove(index);
              }}
              className={`${classes.delBtn} ${classes.btn}`}
            >
              Delete
            </Button>
            {array.length - 1 == index && (
              <Button
                variant="outlined"
                size="large"
                type="button"
                disableElevation
                onClick={() => {
                  append({ tag: "" });
                }}
                className={`${classes.addBtn} ${classes.btn}`}
              >
                Add tag
              </Button>
            )}
          </div>
        );
      })}
    </>
  );
};

export default FieldArray;
