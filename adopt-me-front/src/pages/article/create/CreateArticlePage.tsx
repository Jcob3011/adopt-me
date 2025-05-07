import * as React from "react";
import {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import classes from "./CreateArticlePage.module.css";
import {SnackbarContext} from "../../../providers/snackbar-provider/SnackbarProvider";
import {api} from "../../../api";
import {SnackbarType} from "../../../types/SnackbarType";
import {RoutePath} from "../../../router/RoutePath";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {ArticleTypeEnum} from "../../../api/article/ArticleTypeEnum";
import {Article, ArticleForm} from "../../../forms/article-form/ArticleForm";

export const CreateArticlePage = () => {
    const {t} = useTranslation()
    const theme = useTheme()
    const navigate = useNavigate()
    const {showSnackbar} = useContext(SnackbarContext)
    const [loading, setLoading] = useState(false)

    const initialValues = {
        title:"",
        content: "",
        attachment: null,
        type: ArticleTypeEnum.ZDROWIE,
    }

    const handleFormSubmit = async (values: Article) => {
        let attachmentId
        if (values.attachment) {
            const attachment = await api.attachment.save(
                "Animal Image",
                "Animal Image",
                values.attachment
            )
            attachmentId = attachment.id
        }

        api.article.saveArticle({
            title: values.title,
            content: values.content,
            attachmentId: attachmentId,
            type: values.type,
        }).then(() => {
            navigate(RoutePath.ARTICLE)
            showSnackbar(
                t("snackbar.success.articleCreated"),
                SnackbarType.SUCCESS)
        }).catch(() => {})
            .finally(() => setLoading(false))
    }

    return <Box className={classes.CreateArticlePanel}  sx={{
        backgroundColor: theme.palette.background.default
    }}>
        <ArticleForm
            updateForm={false}
            loading={loading}
            initialValues={initialValues}
            handleFormSubmit={handleFormSubmit}
            title={t("pages.createArticle.title")}
            submitButtonLabel={t("forms.articleForm.createArticleButtonLabel")}
            cancelButtonLabel={t("pages.createArticle.clearFormButtonLabel")}
        />
    </Box>
}