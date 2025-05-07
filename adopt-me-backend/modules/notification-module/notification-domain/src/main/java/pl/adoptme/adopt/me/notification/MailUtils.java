package pl.adoptme.adopt.me.notification;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import pl.adoptme.adopt.me.notification.model.Notification;
import pl.adoptme.adopt.me.notification.model.Registration;
import pl.adoptme.adopt.me.notification.model.ResetPassword;
import pl.adoptme.adopt.me.notification.model.UpdateProfile;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;


import java.util.HashMap;
import java.util.Map;

class MailUtils {
    public static MimeMessageHelper prepareMailMessage(Notification notification,
                                                       MimeMessage message, TemplateEngine templateEngine) {
        Map<String, Object> templateModel = new HashMap<>();
        Context thymeleafContext = new Context();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "iso-8859-2");
            helper.setTo(notification.getEmail());
            String htmlBody;

            switch (notification.getType()) {
                case PASSWORD_RESET -> {
                    ResetPassword resetPassword = (ResetPassword) notification;
                    templateModel.put("name", resetPassword.getFirstName());
                    templateModel.put("link", resetPassword.getUrl());
                    thymeleafContext.setVariables(templateModel);
                    htmlBody = templateEngine.process("/reset-password.html", thymeleafContext);
                    helper.setSubject("Sensilabs password reset");
                }
                case REGISTRATION -> {
                    Registration registration = (Registration) notification;
                    templateModel.put("name", registration.getFirstName());
                    templateModel.put("link", registration.getUrl());
                    thymeleafContext.setVariables(templateModel);
                    htmlBody = templateEngine.process("/registration.html", thymeleafContext);
                    helper.setSubject("Sensilabs registration");
                }
                case UPDATE_PROFILE -> {
                    UpdateProfile updateProfile = (UpdateProfile) notification;
                    templateModel.put("name", updateProfile.getFirstName());
                    templateModel.put("link", updateProfile.getUrl());
                    thymeleafContext.setVariables(templateModel);
                    htmlBody = templateEngine.process("/update-profile.html", thymeleafContext);
                    helper.setSubject("Sensilabs profile update request");
                }
                default -> throw new ApplicationException(ErrorCode.NOTIFICATION_TYPE_EXCEPTION);
            }

            helper.setText(htmlBody, true);
            return helper;
        } catch (MessagingException e) {
            throw new ApplicationException(ErrorCode.SENDING_NOTIFICATION_EXCEPTION);
        }
    }
}

