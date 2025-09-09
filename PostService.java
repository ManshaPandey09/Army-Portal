package com.armyportal.service;

import com.armyportal.model.Post;
import com.armyportal.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepo;

    public PostService(PostRepository postRepo) {
        this.postRepo = postRepo;
    }

    public List<Post> getAllPosts() {
        return postRepo.findAll();
    }

    public Post createPost(Post post) {
        return postRepo.save(post);
    }

    public Post likePost(Long id) {
        Post post = postRepo.findById(id).orElseThrow();
        post.setLikes(post.getLikes() + 1);
        return postRepo.save(post);
    }
}
