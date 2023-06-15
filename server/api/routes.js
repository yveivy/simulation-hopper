const express = require("express")
const router = require('express').Router();
const {callOpenAiApi, getOpenAiApiKey} = require('./ai.js');


router.post('/openai', async (req, res) => {
    var prompt = req.body.prompt
    try {
        var promptResponse = await callOpenAiApi(prompt)
        res.status(200).json(promptResponse)
        return
    } catch (err) {
        res.status(500).json(err)
        return
    }
});

router.get('/', async (req, res) => {
    res.json("get_______")
});


module.exports = router