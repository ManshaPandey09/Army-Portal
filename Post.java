package com.armyportal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String image;
    private String caption;
    private String tags;
    private String description;
    private int likes = 0;
    private String postId;

    private LocalDateTime timestamp = LocalDateTime.now();

    // getters and setters
}
