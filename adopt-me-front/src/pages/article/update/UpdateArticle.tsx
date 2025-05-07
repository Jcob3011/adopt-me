import {useTranslation} from "react-i18next";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {SnackbarContext} from "../../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../../types/SnackbarType";
import {api} from "../../../api";
import {LoadingSpinner} from "../../../components/loading-spinner/LoadingSpinner";
import {ArticleDto} from "../../../api/article/response/ArticleDto";
import {Article, ArticleForm} from "../../../forms/article-form/ArticleForm";

interface UpdateArticleProps {
    article: ArticleDto
    handleUpdate: (update: boolean) => void
}

export const UpdateArticle = ({article, handleUpdate}: UpdateArticleProps) => {
    const {t} = useTranslation()
    const {showSnackbar} = useContext(SnackbarContext)
    const [loading, setLoading] = useState(true)
    const [attachment, setAttachment] = useState<File | null>(null)

    useEffect(() => {
        if (article.attachmentId) {
            api.attachment.download(article.attachmentId).then((blobAttachment) => {
                const attachment = new File([blobAttachment],
                    t("pages.updateArticle.currentAttachment"))
                setAttachment(attachment)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [])

    const initialValues = {
        title: article.title,
        content: article.content,
        attachment: attachment,
        type: article.type,
    }

    const handleFormSubmit = async (values: Article) => {

        setLoading(true)
        let attachmentId = article.attachmentId
        if (values.attachment) {
            const attachment = await api.attachment.save(
                "article picture",
                "article picture",
                values.attachment
            )
            attachmentId = attachment.id
        } else {
            attachmentId = undefined
        }

        api.article.updateArticle({
            title: values.title,
            content: values.content,
            attachmentId: attachmentId,
            type: values.type,
        }, article.id).then(() => {
            handleUpdate(false)
            showSnackbar(
                t("snackbar.success.articleUpdated"),
                SnackbarType.SUCCESS
            )
        }).catch(() => {})
            .finally(() => setLoading(false))
    }

    return loading ?
        <LoadingSpinner/> :
        <ArticleForm
            updateForm
            title={t("pages.updateArticle.title")}
            submitButtonLabel={t("forms.articleForm.updateArticleButtonLabel")}
            cancelButtonLabel={t("pages.updateArticle.cancelButtonLabel")}
            loading={loading}
            initialValues={initialValues}
            handleFormSubmit={handleFormSubmit}
        />
}