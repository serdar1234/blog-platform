import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import classes from "./NewArticle.module.scss";
import FormTitle from "../FormTitle";
import { useForm, FieldValues } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  createArticle,
  fetchThisArticle,
  updateArticle,
} from "../../utils/fetchAPI";
import InputField from "../Input";
import { Alert, Button } from "@mui/material";
import FieldArray from "../NewArticleFieldArray";
import { IArticle, RootState } from "../../types/interfaces";
import ErrorComponent from "../Error";

const Article: React.FC<{ editMode?: boolean }> = ({ editMode = false }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [info, setInfo] = useState<IArticle | undefined>(undefined);
  const currentPage: number | undefined = useSelector(
    (store: RootState) => store.articles.currentPage,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
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

  useEffect(() => {
    if (editMode) {
      fetchThisArticle(slug, dispatch)
        .then((res) => {
          if (res) {
            const thisArticle = res.article;
            setInfo(thisArticle);
          } else {
            setInfo(undefined);
          }
        })
        .catch((error) => {
          setInfo(undefined);
          return <ErrorComponent errorMessage={error.message} />;
        });
    } else setInfo(undefined);
  }, [dispatch, editMode, slug]);

  useEffect(() => {
    if (editMode) {
      setValue("title", info?.title);
      setValue("description", info?.description);
      setValue("body", info?.body);
    } else {
      setValue("title", "");
      setValue("description", "");
      setValue("body", "");
    }
    const tags = info?.tagList.map((x) => ({ tag: x }));
    if (tags && tags?.length > 0) {
      setValue("tagList", tags);
    } else setValue("tagList", [{ tag: "" }]);
  }, [info, setValue, editMode]);

  const submitForm = async (data: FieldValues) => {
    let result: { success: boolean; message: string } | undefined;
    if (editMode) {
      result = await updateArticle(dispatch, data, slug, currentPage);
      if (result && result.success) {
        navigate("/");
      } else if (result && !result.success) {
        setErrorMessage(result.message);
      }
    } else {
      result = await createArticle(dispatch, data);
      if (result && result.success) {
        navigate("/");
      } else if (result && !result.success) {
        setErrorMessage(result.message);
      }
    }
  };
  const handleChange = (n: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(n, e.target.value.trimStart());
  };

  return (
    <Paper className={classes.card} elevation={4}>
      <FormTitle>{editMode ? "Edit article" : "Create new article"}</FormTitle>
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
          defaultValue={info && info.description}
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
          name="body"
          label="Text"
          defaultValue={info && info.body}
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
            handleChange("body", e)
          }
          placeholder="text"
        />
        <FieldArray
          control={control}
          register={register}
          setValue={setValue}
          errors={errors}
          hasDefaultTags={Array.isArray(info?.tagList)}
        />
        {errorMessage && (
          <Alert severity="error" onClose={() => setErrorMessage(null)}>
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
