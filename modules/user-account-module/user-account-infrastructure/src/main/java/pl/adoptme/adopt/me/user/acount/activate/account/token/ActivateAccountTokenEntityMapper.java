package pl.adoptme.adopt.me.user.acount.activate.account.token;


import pl.adoptme.adopt.me.user.account.activate.account.token.ActivateAccountToken;

public class ActivateAccountTokenEntityMapper {

    public static ActivateAccountTokenEntity createActivateAccountTokenEntity(ActivateAccountToken token) {
        return ActivateAccountTokenEntity.builder()
                .id(token.getId())
                .userId(token.getUserId())
                .expirationDate(token.getExpirationDate())
                .used(token.isUsed())
                .build();
    }

    public static ActivateAccountToken mapToActivateAccountToken(ActivateAccountTokenEntity entity) {
        return ActivateAccountToken.builder()
                .id(entity.getId())
                .expirationDate(entity.getExpirationDate())
                .userId(entity.getUserId())
                .used(entity.isUsed())
                .build();
    }
}

