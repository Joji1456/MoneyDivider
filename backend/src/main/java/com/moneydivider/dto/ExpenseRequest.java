package com.moneydivider.dto;

import java.util.List;
import com.moneydivider.model.Expense;
import lombok.Data;

@Data
public class ExpenseRequest {

    private Expense expense;
    private List<Long> memberIds;
}

