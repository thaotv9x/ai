package com.it.spring.ai;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EntityGenerationResponse {

    private String status;

    private String fileName;

    private String fileSize;

    private String tableInfo;

    private String entityCode;
}
