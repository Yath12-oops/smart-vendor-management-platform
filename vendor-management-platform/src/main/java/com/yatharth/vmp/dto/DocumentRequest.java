package com.yatharth.vmp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DocumentRequest {

    private String documentType;

    private String fileName;

    private String filePath;

    @NotBlank
    private Long vendorId;
}
