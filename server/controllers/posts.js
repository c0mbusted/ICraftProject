import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log('here')
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    } 
}

export const updatePost = async (req,res) => {
    const { id: _id } = req.params;
    const post = req.body; //from here we receive data for updates
    //check if _id is mongoose object id

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    //if valid we update post we pull model
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);


}

export const deletePost = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deletes successfully' });

}

export const likePost = async (req,res) => {
    const { id } = req.params;
    //check if user is authenticated
    if(!req.userId) return res.json({ message: 'Unauthenticated' });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const index = post.likes.findIndex((id) => id == String(req.userId));

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);

}
