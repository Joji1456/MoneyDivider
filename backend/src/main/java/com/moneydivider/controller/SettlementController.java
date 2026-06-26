package com.moneydivider.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.moneydivider.model.Settlement;
import com.moneydivider.service.SettlementService;

@RestController
@RequestMapping("/settlements")
@CrossOrigin("*")
public class SettlementController {

    @Autowired
    private SettlementService settlementService;

    @PostMapping
    public Settlement createSettlement(
            @RequestBody Settlement settlement) {

        return settlementService.createSettlement(settlement);
    }

    @GetMapping
    public List<Settlement> getAllSettlements() {

        return settlementService.getAllSettlements();
    }

    @GetMapping("/{id}")
    public Settlement getSettlementById(
            @PathVariable Long id) {

        return settlementService.getSettlementById(id);
    }

    @PutMapping("/{id}/{status}")
    public Settlement updateStatus(
            @PathVariable Long id,
            @PathVariable String status) {

        return settlementService.updateSettlementStatus(id,status);
    }

    @DeleteMapping("/{id}")
    public String deleteSettlement(
            @PathVariable Long id) {

        settlementService.deleteSettlement(id);

        return "Settlement deleted successfully";
    }
}
