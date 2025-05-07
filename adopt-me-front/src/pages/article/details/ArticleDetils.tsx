import Box from "@mui/material/Box"
import classes from "./ArticleDetails.module.css"
import {DetailsBox} from "../../../components/details-box/DetailsBox";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../../api";
import {RoutePath} from "../../../router/RoutePath";
import {SnackbarContext} from "../../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../../types/SnackbarType";
import reactModal from "@prezly/react-promise-modal";
import {CommonDialog} from "../../../components/dialog/common-dialog/CommonDialog";
import {asDate} from "../../../utils/format/FormatData";
import {EnumTranslateContext} from "../../../providers/enum-translate-provider/EnumTranslateProvider";
import {
    ArticleTypeTranslate,
} from "../../../providers/enum-translate-provider/Translations";
import {LoadingSpinner} from "../../../components/loading-spinner/LoadingSpinner";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {ArticleDto} from "../../../api/article/response/ArticleDto";
import {ArticleTypeEnum} from "../../../api/article/ArticleTypeEnum";
import {UpdateArticle} from "../update/UpdateArticle";

export const ArticleDetails = () => {
    const {t} = useTranslation()
    const {id} = useParams()
    const navigate = useNavigate()
    const {showSnackbar} = useContext(SnackbarContext)
    const {translateEnum} = useContext(EnumTranslateContext)
    const [article, setArticle] = useState<ArticleDto>()
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false)
    const theme = useTheme()

    useEffect(() => {
        if (id) {
            api.article.getArticleById(id!)
                .then(article => {
                    setArticle(article)
                }).catch(() => {
            })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            navigate(RoutePath.ARTICLE)
        }
    }, [update])

    const handleDelete = async () => {
        const isConfirmed = await reactModal(({show, onSubmit, onDismiss}) => {
            return <CommonDialog
                open={show}
                title={t("pages.articleDetails.deleteDialog.title")}
                content={t("pages.articleDetails.deleteDialog.content")}
                submitButtonLabel={t("pages.articleDetails.deleteDialog.submitButtonLabel")}
                cancelButtonLabel={t("pages.articleDetails.deleteDialog.cancelButtonLabel")}
                handleSubmit={onSubmit}
                handleCancel={onDismiss}
                theme={theme}
            />
        })

        if (isConfirmed) {
            await api.article.deleteArticle(id!)
            navigate(RoutePath.ARTICLE)
            showSnackbar(
                t("snackbar.success.articleDeleted"),
                SnackbarType.SUCCESS
            )
        }
    }

    const handleUpdate = () => {
        setUpdate(!update)
    }

    return loading ?
        <LoadingSpinner/> :
        <Paper className={classes.ArticleDetailsPanel} elevation={0} sx={{
            backgroundColor: theme.palette.background.default
        }}>
            <Box className={classes.ArticleDetailsBox}>
                <Box className={update || article!.type === ArticleTypeEnum.ZDROWIE ?
                    classes.DetailsBoxFullWidth :
                    classes.DetailsBox}>
                    <DetailsBox
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                        updatingMode={update}
                        updateComponent={
                            <UpdateArticle
                                handleUpdate={handleUpdate}
                                article={article!}
                            />}
                        title={t("pages.articleDetails.title")}
                        attachment={article!.attachmentId ? {
                            label: t("pages.articleDetails.attachment"),
                            id: article!.attachmentId
                        } : undefined}
                        updateTitle={t("pages.articleDetails.updateTitle")}
                        data={[
                            {
                                title: t("pages.articleDetails.primaryDataTitle"),
                                fields: [
                                    {
                                        label: t("pages.articleDetails.title"),
                                        value: [article!.title]
                                    },
                                    {
                                        label: t("pages.articleDetails.content"),
                                        value: [article!.content]
                                    },
                                    {
                                        label: t("pages.articleDetails.type"),
                                        value: [translateEnum(ArticleTypeTranslate, article!.type)],
                                        roundedBox: true
                                    },
                                ]
                            },
                            {
                                title: t("pages.articleDetails.metaDataTitle"),
                                fields: [
                                    {
                                        label: t("pages.articleDetails.createdOn"),
                                        value: [asDate(article!.createdOn)]
                                    },
                                    {
                                        label: t("pages.articleDetails.updatedOn"),
                                        value: [asDate(article!.updatedOn)]
                                    }
                                ]
                            }]}
                    />
                </Box>
            </Box>
        </Paper>
}