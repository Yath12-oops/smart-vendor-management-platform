package com.yatharth.vmp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendorResponse {

    private Long id;

    private String companyName;

    private String gstNumber;

    private String panNumber;

    private String status;
}

