package com.moneydivider.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moneydivider.model.Expense;
import com.moneydivider.repository.ExpenseRepository;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

public Expense saveExpense(Expense expense) {

        if (expense.getAmount() == null) {
            throw new RuntimeException(
                "Amount cannot be null");
        }

        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }
}