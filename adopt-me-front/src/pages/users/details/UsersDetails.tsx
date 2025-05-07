import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {RoutePath} from "../../../router/RoutePath";
import {SnackbarType} from "../../../types/SnackbarType";
import {UserAccountDto} from "../../../api/user-account/response/UserAccountDto";
import {CircularProgress} from "@mui/material";
import {DetailsBox} from "../../../components/details-box/DetailsBox";
import reactModal from "@prezly/react-promise-modal";
import {CommonDialog} from "../../../components/dialog/common-dialog/CommonDialog";
import {TabMenu} from "../../../components/tab-menu/TabMenu";
import {ProfileIcon} from "../../../components/icons/ProfileIcon";
import {ChangePasswordMenu} from "./change-password-menu/ChangePasswordMenu";
import {ChangePasswordIcon} from "../../../components/icons/ChangePasswordIcon";
import {asDate} from "../../../utils/format/FormatData";
import {SnackbarContext} from "../../../providers/snackbar-provider/SnackbarProvider";
import {api} from "../../../api";
import {UpdateUser} from "../update/UpdateUser";
import {UserAttachmentBox} from "./user-attachment-box/UserAttachmentBox";
import {DocumentIcon} from "../../../components/icons/DocumentIcon";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";

export const UsersDetails = () => {

    const {t} = useTranslation()
    const {id} = useParams()
    const {showSnackbar} = useContext(SnackbarContext)
    const navigate = useNavigate()
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userAccount, setUserAccount] =
        useState<UserAccountDto | undefined>(undefined)
    const theme = useTheme()

    useEffect(() => {
        if (!id) {
            navigate(RoutePath.USERS)
        }
        api.userAccount.getUser(id!).then(userAccountDto => {
            setUserAccount(userAccountDto)
        }).catch(() => {
            navigate(RoutePath.USERS)
        }).finally(() => {
            setLoading(false)
        })
    }, [update])

    const handleUpdate = () => {
        setUpdate(!update)
    }

    const handleDelete = async () => {
        const isConfirmed = await reactModal(({show, onSubmit, onDismiss}) => {
            return <CommonDialog
                open={show}
                title={t("pages.userDetails.deleteDialog.title")}
                content={t("pages.userDetails.deleteDialog.content")}
                submitButtonLabel={t("pages.userDetails.deleteDialog.submitButtonLabel")}
                cancelButtonLabel={t("pages.userDetails.deleteDialog.cancelButtonLabel")}
                handleSubmit={onSubmit}
                handleCancel={onDismiss}
                theme={theme}
            />
        })

        if (isConfirmed) {
            await api.userAccount.deleteUser(id!)
            navigate(RoutePath.USERS)
            showSnackbar(
                t("snackbar.success.userDeleted"),
                SnackbarType.SUCCESS
            )
        }
    }

    return (loading) ?
        <CircularProgress/> :
        <TabMenu menu={[
            {
                label: t("pages.userDetails.accountDetailsMenuLabel"),
                icon: <ProfileIcon/>,
                activeIcon: <ProfileIcon active/>,
                component: <DetailsBox
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    updatingMode={update}
                    updateComponent={<UpdateUser handleUpdate={handleUpdate}/>}
                    title={t("pages.userDetails.detailsBoxTitle")}
                    updateTitle={t("pages.userDetails.detailsBoxUpdateTitle")}
                    data={[
                        {
                            title: t("pages.userDetails.personalDetailsLabel"),
                            fields: [
                                {
                                    label: t("pages.userDetails.firstNameLabel"),
                                    value: [userAccount!.firstName]
                                },
                                {
                                    label: t("pages.userDetails.lastNameLabel"),
                                    value: [userAccount!.lastName]
                                },
                                {
                                    label: t("pages.userDetails.emailLabel"),
                                    value: [userAccount!.email]
                                },
                                {
                                    label: t("pages.userDetails.statusLabel"),
                                    value: [
                                        t<string>(`pages.userDetails.status.${userAccount!.status.toLowerCase()}`)
                                    ],
                                    roundedBox: true
                                },
                                {
                                    label: t("pages.userDetails.roleLabel"),
                                    value: [
                                        t<string>(`pages.userDetails.role.${userAccount!.role.toLowerCase()}`)
                                    ],
                                    roundedBox: true
                                },
                            ]
                        },
                        {
                            title: t("pages.userDetails.metaDataLabel"),
                            fields: [
                                {
                                    label: t("pages.userDetails.createdOnLabel"),
                                    value: [asDate(userAccount!.createdOn)]
                                },
                                {
                                    label: t("pages.userDetails.updatedOnLabel"),
                                    value: [asDate(userAccount!.updatedOn)]
                                }
                            ]
                        }]}
                />
            },
            {
                label: t("pages.userDetails.avatarMenuLabel"),
                icon: <DocumentIcon/>,
                activeIcon: <DocumentIcon active/>,
                component: <UserAttachmentBox
                    userAccount={userAccount!}
                    reloadAttachment={handleUpdate}
                />
            },
            {
                label: t("pages.userDetails.changePasswordMenuLabel"),
                icon: <ChangePasswordIcon/>,
                activeIcon: <ChangePasswordIcon active/>,
                component: <ChangePasswordMenu userId={id!}/>
            }]}
        />
}