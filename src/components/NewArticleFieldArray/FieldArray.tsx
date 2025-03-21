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
import { useEffect, useState } from "react";

const FieldArray: React.FC<{
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  setValue: (name: string, value: unknown, config?: SetValueConfig) => void;
  errors: FieldErrors<FieldValues>;
  hasDefaultTags?: boolean;
}> = ({ control, register, setValue, errors, hasDefaultTags }) => {
  const { fields, append, remove } = useFieldArray({
    name: "tagList",
    control,
  });
  const [isEmptyTag, setIsEmptyTag] = useState<boolean>(true);
  const handleChange = (n: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(n, e.target.value.trimStart());
  };
  useEffect(() => {
    if (hasDefaultTags) setIsEmptyTag(false);
  }, [hasDefaultTags]);
  console.log("def tags are", hasDefaultTags);
  return (
    <>
      <label>Tags</label>
      {fields.map((field, index, array) => {
        return (
          <div key={field.id} className={classes.tagsDiv}>
            <InputField
              name={`tagList.${index}.tag`}
              required={false}
              fullWidth={false}
              label=""
              register={register}
              errors={errors}
              placeholder="tag"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length < 2) {
                  setIsEmptyTag(true);
                } else setIsEmptyTag(false);
                handleChange(`tagList.${index}.tag`, e);
              }}
            />
            <Button
              variant="outlined"
              type="button"
              disableElevation
              onClick={() => {
                if (array.length == 1) {
                  // clear the input but don't delete if there is only one tag left
                  setValue(`tagList.0.tag`, "");
                } else {
                  remove(index);
                  setIsEmptyTag(false);
                }
              }}
              className={`${classes.delBtn} ${classes.btn}`}
            >
              Delete
            </Button>
            {array.length - 1 == index && (
              <Button
                variant="outlined"
                size="large"
                disabled={isEmptyTag}
                type="button"
                disableElevation
                onClick={() => {
                  setIsEmptyTag(true);
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
