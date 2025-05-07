package pl.adoptme.adoptme.common.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FrontendLanguage {
    POLISH("pl"),
    ENGLISH("en");

    private final String label;
}
