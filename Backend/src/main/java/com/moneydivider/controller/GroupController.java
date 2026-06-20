package com.moneydivider.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.moneydivider.model.Group;
import com.moneydivider.service.GroupService;

@RestController
@RequestMapping("/groups")
public class GroupController {

    @Autowired
    private GroupService service;

    @PostMapping
    public Group addGroup(@RequestBody Group group) {
        return service.saveGroup(group);
    }

    @GetMapping
    public List<Group> getGroups() {
        return service.getAllGroups();
    }
}
