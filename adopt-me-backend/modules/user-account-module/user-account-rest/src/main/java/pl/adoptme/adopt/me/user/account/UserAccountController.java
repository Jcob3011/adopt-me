package pl.adoptme.adopt.me.user.account;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.adoptme.adopt.me.attachment.Attachment;
import pl.adoptme.adopt.me.attachment.AttachmentService;
import pl.adoptme.adopt.me.user.account.dto.UserAccountDto;
import pl.adoptme.adopt.me.user.account.dto.UserAccountDtoMapper;
import pl.adoptme.adopt.me.user.account.form.UserAccountSaveForm;
import pl.adoptme.adopt.me.user.account.form.UserAccountSelfUpdateForm;
import pl.adoptme.adopt.me.user.account.form.UserAccountUpdateForm;
import pl.adoptme.adoptme.adoptme.common.rest.LoggedUser;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.List;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.user.account.dto.UserAccountDtoMapper.mapToDto;

@RestController
@RequestMapping("/user-account")
@RequiredArgsConstructor
public class UserAccountController {

    private final UserAccountService userAccountService;
    private final AttachmentService attachmentService;
    private final LoggedUser loggedUser;

    @PostMapping("/search")
    public SearchResponse<UserAccountDto> searchUsers(@RequestBody SearchForm form) {
        SearchResponse<UserAccount> searchResponse = userAccountService.search(form);
        List<String> attachmentIds = searchResponse.getItems().stream()
                .map(UserAccount::getAttachmentId)
                .collect(Collectors.toList());

        List<Attachment> attachments = attachmentService.getAll(attachmentIds, false);
        return searchResponse.map(userAccount -> {
            Attachment attachment = attachments.stream()
                    .filter(attach -> attach.getId().equals(userAccount.getAttachmentId()))
                    .findFirst()
                    .orElse(null);
            return UserAccountDtoMapper.mapToDto(userAccount, attachment);
        });
    }

    @GetMapping("/{userId}")
    public UserAccountDto getUserById(@PathVariable String userId) {
        UserAccount userAccount = userAccountService.get(userId);
        Attachment attachment = attachmentService.getOrNull(userAccount.getAttachmentId(), false);
        return mapToDto(userAccount, attachment);
    }

    @GetMapping("/self")
    public UserAccountDto getSelfUser() {
        UserAccount userAccount = userAccountService.get(loggedUser.getLoggedUserId());
        Attachment attachment = attachmentService.getOrNull(userAccount.getAttachmentId(), false);
        return mapToDto(userAccount, attachment);
    }

    @PostMapping
    public UserAccountDto saveUser(@RequestBody UserAccountSaveForm userAccountSaveDto) {
        UserAccount userAccount = userAccountService.save(userAccountSaveDto, loggedUser.getLoggedUserId());
        Attachment attachment = attachmentService.getOrNull(userAccount.getAttachmentId(), false);
        return mapToDto(userAccount, attachment);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable String userId) {
        userAccountService.deleteById(userId, loggedUser.getLoggedUserId());
    }

    @PutMapping("/self")
    public void updateSelfUser(@RequestBody UserAccountSelfUpdateForm userAccountUpdateForm) {
        userAccountService.updateSelf(userAccountUpdateForm, loggedUser.getLoggedUserId());
    }

    @PutMapping("/{userId}")
    public void updateUserById(
            @RequestBody UserAccountUpdateForm userAccountUpdateForm,
            @PathVariable String userId) {
        userAccountService.updateUserById(userAccountUpdateForm, userId);
    }
}

