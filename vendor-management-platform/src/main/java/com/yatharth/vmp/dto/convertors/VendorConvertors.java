package com.yatharth.vmp.dto.convertors;

import com.yatharth.vmp.dto.VendorRequest;
import com.yatharth.vmp.dto.VendorResponse;
import com.yatharth.vmp.entity.Vendor;
import com.yatharth.vmp.entity.enums.VendorStatus;

public class VendorConvertors {

    public static VendorResponse vendorToVendorResponse(Vendor vendor){
        return VendorResponse.builder()
                .id(vendor.getId())
                .companyName(vendor.getCompanyName())
                .gstNumber(vendor.getGstNumber())
                .panNumber(vendor.getPanNumber())
                .build();
    }

    public static Vendor vendorRequestToVendor(VendorRequest vendorRequest){
        return Vendor.builder()
                .companyName(vendorRequest.getCompanyName())
                .gstNumber(vendorRequest.getGstNumber())
                .panNumber(vendorRequest.getPanNumber())
                .status(VendorStatus.PENDING)
                .build();
    }
}
