package com.yatharth.vmp.controller;

import com.yatharth.vmp.entity.Vendor;
import com.yatharth.vmp.service.VendorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final VendorService vendorService;

    @GetMapping("/test")
    public String adminTest(){
        return "Welcome Admin";
    }

    @PutMapping("/vendors/{id}/approve")
    public Vendor approveVendor(@PathVariable Long id){
        return vendorService.approveVendor(id);
    }

    @PutMapping("/vendors/{id}/reject")
    public Vendor rejectVendor(@PathVariable Long id){
        return vendorService.rejectVendor(id);
    }

}
