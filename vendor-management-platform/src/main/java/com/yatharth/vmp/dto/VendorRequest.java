package com.yatharth.vmp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VendorRequest {

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "GST Number is required")
    private String gstNumber;

    @NotBlank(message = "PAN Number is required")
    private String panNumber;

    private Long userId;
}
