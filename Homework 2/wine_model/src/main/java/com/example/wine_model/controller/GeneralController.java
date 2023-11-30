package com.example.wine_model.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class GeneralController {

    @GetMapping("/")
    public String getHomePage() {
        return "home";
    }


}
