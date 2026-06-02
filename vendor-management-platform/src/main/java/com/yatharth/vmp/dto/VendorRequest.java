package com.yatharth.vmp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VendorRequest {
    @NotBlank
    private String companyName;

    @NotBlank
    private String gstNumber;

    @NotBlank
    private String panNumber;

    private Long userId;
}
