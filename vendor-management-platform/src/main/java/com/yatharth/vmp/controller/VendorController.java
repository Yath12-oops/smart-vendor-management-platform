package com.yatharth.vmp.controller;

import com.yatharth.vmp.dto.VendorRequest;
import com.yatharth.vmp.dto.VendorResponse;
import com.yatharth.vmp.service.VendorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendors")
@RequiredArgsConstructor
public class VendorController {

    private final VendorService vendorService;

    @PostMapping
    public VendorResponse createVendor(@Valid @RequestBody VendorRequest vendorRequest){
        return vendorService.createVendor(vendorRequest);
    }

    @GetMapping
    public List<VendorResponse> getAllVendors() {
        return vendorService.getAllVendors();
    }

    @GetMapping("/{id}")
    public VendorResponse getVendorById(@PathVariable Long id) {
        return vendorService.getVendorById(id);
    }

    @PutMapping("/{id}")
    public VendorResponse updateVendor(@PathVariable Long id, @Valid @RequestBody VendorRequest request) {
        return vendorService.updateVendor(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);
        return "Vendor deleted successfully";
    }

    @GetMapping("/user/{userId}")
    public VendorResponse getVendorByUserId(@PathVariable Long userId) {
        return vendorService.getVendorByUserId(userId);
    }
}
