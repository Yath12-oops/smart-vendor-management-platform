package com.yatharth.vmp.service;

import com.yatharth.vmp.dto.VendorRequest;
import com.yatharth.vmp.dto.VendorResponse;
import com.yatharth.vmp.entity.User;
import com.yatharth.vmp.entity.Vendor;
import com.yatharth.vmp.exception.VendorNotFoundException;
import com.yatharth.vmp.repos.UserRepo;
import com.yatharth.vmp.repos.VendorRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VendorService {
    private final VendorRepo vendorRepo;
    private final UserRepo userRepo;

    public VendorResponse createVendor(VendorRequest vendorRequest) {

        User user = userRepo.findById(vendorRequest.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Vendor vendor=new Vendor();

        vendor.setCompanyName(vendorRequest.getCompanyName());
        vendor.setGstNumber(vendorRequest.getGstNumber());
        vendor.setPanNumber(vendorRequest.getPanNumber());
        vendor.setStatus("PENDING");
        vendor.setUser(user);

        return mapToResponse(vendorRepo.save(vendor));
    }

    public List<VendorResponse> getAllVendors() {
        return vendorRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public VendorResponse getVendorById(Long id) {
        return mapToResponse(vendorRepo.findById(id)
                .orElseThrow(() ->
                        new VendorNotFoundException("Vendor not found")));
    }

    public VendorResponse updateVendor(Long id, VendorRequest request) {

        Vendor vendor = vendorRepo.findById(id)
                .orElseThrow(() ->
                        new VendorNotFoundException("Vendor not found"));

        vendor.setCompanyName(request.getCompanyName());
        vendor.setGstNumber(request.getGstNumber());
        vendor.setPanNumber(request.getPanNumber());

        return mapToResponse(vendorRepo.save(vendor));
    }

    public void deleteVendor(Long id) {

        Vendor vendor = vendorRepo.findById(id)
                .orElseThrow(() ->
                        new VendorNotFoundException("Vendor not found"));

        vendorRepo.delete(vendor);
    }

    private VendorResponse mapToResponse(Vendor vendor) {

        return new VendorResponse(
                vendor.getCompanyName(),
                vendor.getGstNumber(),
                vendor.getPanNumber(),
                vendor.getStatus()
        );
    }
}
