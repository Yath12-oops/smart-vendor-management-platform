package com.yatharth.vmp.controller;

import com.yatharth.vmp.dto.DashboardResponse;
import com.yatharth.vmp.dto.DocumentResponse;
import com.yatharth.vmp.dto.VendorResponse;
import com.yatharth.vmp.entity.Document;
import com.yatharth.vmp.entity.Vendor;
import com.yatharth.vmp.service.AdminService;
import com.yatharth.vmp.service.DocumentService;
import com.yatharth.vmp.service.VendorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final VendorService vendorService;
    private final DocumentService documentService;

    @GetMapping("/test")
    public String adminTest(){
        return "Welcome Admin";
    }

    @PutMapping("/vendors/{id}/approve")
    public VendorResponse approveVendor(@PathVariable Long id){
        return vendorService.approveVendor(id);
    }

    @PutMapping("/vendors/{id}/reject")
    public VendorResponse rejectVendor(@PathVariable Long id){
        return vendorService.rejectVendor(id);
    }

    @PutMapping("/documents/{id}/verify")
    public Document verifyDocument(@PathVariable Long id){
        return documentService.verifyDocument(id);
    }

    @PutMapping("/documents/{id}/reject")
    public Document rejectDocument(@PathVariable Long id){
        return documentService.rejectDocument(id);
    }

    @GetMapping("/dashboard")
    public DashboardResponse getDashboardStats(){
        return adminService.getDashboardStats();
    }

    @GetMapping("/documents")
    public List<DocumentResponse> getAllDocuments() {
        return documentService.getAllDocuments();
    }
}
