import Paper from "@mui/material/Paper";
import classes from "./NewArticle.module.scss";
import FormTitle from "../FormTitle";
import { useForm, FieldValues } from "react-hook-form";
// import { useForm, FieldValues, useFieldArray } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
import InputField from "../Input";
import { Alert, Button } from "@mui/material";
import { useState } from "react";
import FieldArray from "../NewArticleFieldArray";

// interface Tag {
//   tag: string;
// }
// interface FormValues {
//   title: string; // Add username field
//   tagList: Tag[];
// }

const Article: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      tagList: [{ tag: "" }],
    },
  });
  // const { fields, append, remove } = useFieldArray({
  //   name: "tagList",
  //   control,
  // });

  const submitForm = async (data: FieldValues) => {
    console.log(data);
    // const result: { success: boolean; message: string } | undefined =
    //   await newUserSignUp(dispatch, data);
    // if (result && result.success) {
    //   navigate("/");
    // } else if (result && !result.success) {
    //   setErrorMessage(result.message);
    // }
  };
  const handleChange = (n: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(n, e.target.value.trimStart());
  };

  return (
    <Paper className={classes.card} elevation={4}>
      <FormTitle>Create new article</FormTitle>
      <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
        <InputField
          label="Title"
          name="title"
          register={register}
          errors={errors}
          rules={{
            required: "Title is required",
            minLength: {
              value: 2,
              message: "Please ensure the title is at least 2 characters long.",
            },
            maxLength: {
              value: 60,
              message: "Please limit the title to a maximum of 60 characters.",
            },
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("title", e)
          }
          placeholder="Title"
        />
        <InputField
          label="Short description"
          name="description"
          register={register}
          errors={errors}
          rules={{
            required: "Description is required",
            minLength: {
              value: 2,
              message:
                "Please ensure the description is at least 2 characters long.",
            },
            maxLength: {
              value: 160,
              message:
                "Please limit the description to a maximum of 160 characters.",
            },
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("description", e)
          }
          placeholder="Short description"
        />
        <InputField
          name="textField"
          label="Text"
          register={register}
          errors={errors}
          multiline
          minRows={6}
          rules={{
            required: "Article text is required",
            minLength: {
              value: 15,
              message: "Please ensure the text is at least 15 characters long.",
            },
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("textField", e)
          }
          placeholder="text"
        />
        {/* <label>Tags</label> */}
        {/* {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <InputField
                name={`tagList.${index}.tag`}
                fullWidth={false}
                required={false}
                label=""
                register={register}
                errors={errors}
                placeholder="tag"
              />
              <Button
                variant="outlined"
                size="large"
                type="button"
                disableElevation
                onClick={() => {
                  remove(index);
                }}
                className={`${classes.delBtn} ${classes.btn}`}
              >
                Delete
              </Button>
            </div>
          );
        })}
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
        </Button> */}
        <FieldArray
          control={control}
          register={register}
          setValue={setValue}
          errors={errors}
        />
        {errorMessage && (
          <Alert
            severity="error"
            className={classes.alert}
            onClose={() => setErrorMessage(null)}
          >
            {errorMessage}
          </Alert>
        )}
        <Button
          variant="contained"
          size="large"
          type="submit"
          disableElevation
          className={classes.sendBtn}
        >
          Send
        </Button>
      </form>
    </Paper>
  );
};

export default Article;
