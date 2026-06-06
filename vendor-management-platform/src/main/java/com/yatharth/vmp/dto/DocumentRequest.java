package com.yatharth.vmp.dto;

import lombok.Data;

@Data
public class DocumentRequest {

    private String documentType;

    private String fileName;

    private String filePath;

    private Long vendorId;
}
