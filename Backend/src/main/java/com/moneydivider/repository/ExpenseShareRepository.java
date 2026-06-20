package com.moneydivider.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moneydivider.model.ExpenseShare;

@Repository
public interface ExpenseShareRepository extends JpaRepository<ExpenseShare, Long> {
}