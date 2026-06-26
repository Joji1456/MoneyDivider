package com.moneydivider.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moneydivider.model.Settlement;

@Repository
public interface SettlementRepository extends JpaRepository<Settlement, Long> {

    List<Settlement> findByFromUser(Long fromUser);

    List<Settlement> findByToUser(Long toUser);

    List<Settlement> findByStatus(String status);
}
