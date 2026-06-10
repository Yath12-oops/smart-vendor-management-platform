package com.yatharth.vmp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {

    private long totalVendors;
    private long approvedVendors;
    private long pendingVendors;
    private long rejectedVendors;

}
