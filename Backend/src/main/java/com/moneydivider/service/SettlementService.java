package com.moneydivider.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moneydivider.model.Settlement;
import com.moneydivider.repository.SettlementRepository;

@Service
public class SettlementService {

    @Autowired
    private SettlementRepository settlementRepository;

    public Settlement createSettlement(Settlement settlement) {
        return settlementRepository.save(settlement);
    }

    public List<Settlement> getAllSettlements() {
        return settlementRepository.findAll();
    }

    public Settlement getSettlementById(Long id) {
        return settlementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Settlement not found: " + id));
    }

    public Settlement updateSettlementStatus(Long id, String status) {
        Settlement settlement = getSettlementById(id);
        settlement.setStatus(status);
        return settlementRepository.save(settlement);
    }

    public void deleteSettlement(Long id) {
        settlementRepository.deleteById(id);
    }
}
