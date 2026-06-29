package com.yatharth.vmp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class DocumentResponse {

    private Long id;

    private String vendorName;

    private String documentType;

    private String fileName;

    private String status;
}