package com.moneydivider.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moneydivider.model.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
}