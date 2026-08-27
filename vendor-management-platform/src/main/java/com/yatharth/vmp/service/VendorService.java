package com.yatharth.vmp.service;

import com.yatharth.vmp.dto.VendorRequest;
import com.yatharth.vmp.dto.VendorResponse;
import com.yatharth.vmp.dto.convertors.VendorConvertors;
import com.yatharth.vmp.entity.User;
import com.yatharth.vmp.entity.Vendor;
import com.yatharth.vmp.entity.enums.VendorStatus;
import com.yatharth.vmp.exception.UserNotFoundException;
import com.yatharth.vmp.exception.VendorNotFoundException;
import com.yatharth.vmp.repos.UserRepo;
import com.yatharth.vmp.repos.VendorRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VendorService {
    private final VendorRepo vendorRepo;
    private final UserRepo userRepo;

    public VendorResponse createVendor(VendorRequest vendorRequest) {

        User user = userRepo.findById(vendorRequest.getUserId())
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        Vendor vendor=VendorConvertors.vendorRequestToVendor(vendorRequest);
        vendor.setUser(user);

        return VendorConvertors.vendorToVendorResponse(vendorRepo.save(vendor));
    }

    public List<VendorResponse> getAllVendors() {
        List<VendorResponse> list=new ArrayList<>();
        for(Vendor vendor: vendorRepo.findAll()) {
              list.add(VendorConvertors.vendorToVendorResponse(vendor));
        }
        return list;
    }

    public VendorResponse getVendorById(Long id) {
        return VendorConvertors.vendorToVendorResponse(vendorRepo.findById(id)
                .orElseThrow(() ->
                        new VendorNotFoundException("Vendor not found")));
    }

    public VendorResponse updateVendor(Long id, VendorRequest request) {

        Vendor vendor = vendorRepo.findById(id)
                .orElseThrow(() ->
                        new VendorNotFoundException("Vendor not found"));

        if (request.getCompanyName() != null) {
            vendor.setCompanyName(request.getCompanyName());
        }
        if (request.getGstNumber() != null) {
            vendor.setGstNumber(request.getGstNumber());
        }
        if (request.getPanNumber() != null) {
            vendor.setPanNumber(request.getPanNumber());
        }

        return VendorConvertors.vendorToVendorResponse(vendorRepo.save(vendor));
    }

    public void deleteVendor(Long id) {

        Vendor vendor = vendorRepo.findById(id)
                .orElseThrow(() ->
                        new VendorNotFoundException("Vendor not found"));

        vendorRepo.delete(vendor);
    }

    public VendorResponse approveVendor(Long id){

        Vendor vendor=vendorRepo.findById(id).orElseThrow(()->new VendorNotFoundException("Vendor not found"));
        vendor.setStatus(VendorStatus.APPROVED);
        return VendorConvertors.vendorToVendorResponse(vendorRepo.save(vendor));
    }

    public VendorResponse rejectVendor(Long id){

        Vendor vendor=vendorRepo.findById(id).orElseThrow(()->new VendorNotFoundException("Vendor not found"));
        vendor.setStatus(VendorStatus.REJECTED);
        return VendorConvertors.vendorToVendorResponse(vendorRepo.save(vendor));
    }

    public VendorResponse getVendorByUserId(Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        Vendor vendor = vendorRepo.findByUser(user)
                .orElseThrow(() ->
                        new VendorNotFoundException("Vendor not found"));

        return VendorConvertors.vendorToVendorResponse(vendor);
    }
}
