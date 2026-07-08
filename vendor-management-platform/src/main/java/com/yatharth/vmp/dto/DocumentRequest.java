package com.yatharth.vmp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DocumentRequest {

    @NotBlank(message = "Document type is required")
    private String documentType;

    private String fileName;

    private String filePath;

    @NotNull(message = "Vendor Id is required")
    private Long vendorId;
}

