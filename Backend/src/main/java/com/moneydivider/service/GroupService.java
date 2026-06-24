package com.moneydivider.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NonNull;

import com.moneydivider.model.Group;
import com.moneydivider.repository.GroupRepository;

@Service
public class GroupService {
    
    @Autowired
    private GroupRepository groupRepository;
    
    public Group saveGroup(@NonNull Group group) {
        return groupRepository.save(group);
    }
    
    public Group createGroup(@NonNull Group group) {
        return groupRepository.save(group);
    }
    
    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }
}