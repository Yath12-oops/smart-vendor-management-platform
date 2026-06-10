package com.yatharth.vmp.service;

import com.yatharth.vmp.dto.DashboardResponse;
import com.yatharth.vmp.entity.enums.VendorStatus;
import com.yatharth.vmp.repos.VendorRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final VendorRepo vendorRepo;

    public DashboardResponse getDashboardStats(){

        long total=vendorRepo.count();

        long approved=vendorRepo.countByStatus(VendorStatus.APPROVED);
        long pending=vendorRepo.countByStatus(VendorStatus.PENDING);
        long rejected=vendorRepo.countByStatus(VendorStatus.REJECTED);

        return new DashboardResponse(total,approved,pending,rejected);
    }
}
