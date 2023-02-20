const { spawnSync } = require('child_process');
const express = require('express');
const { off } = require('process');
const { json } = require('sequelize');
const { Vocabulary } = require('../models');
const router = express.Router();
// const PythonShell = require('python-shell');
const spawn =  require('child_process').spawn

// 동의어 반환 
//  (GET) /word?sentece = 'sentence'
router.get('', async(req, res, next) => {
    try{
        const sentence = req.query.sentence
        const results = spawn('python',['gpt.py',sentence])
        results.stdout.on('data',function(data) {
        const json_data = JSON.parse(data.toString())
        const selected_word =  json_data[0]
        json_data.shift()
        res.json({selected_word:selected_word, synonyms:json_data})})
    }   
    catch(error){
        console.error(error);
        next(error);
    }
  }
)

// 예문 반환 
//  (GET) /word/example?w='word' 
router.get('/example', async(req, res, next) => {
    try{
        const word = req.query.w
        const results = spawn('python',['gpt_sentence.py',word])
        results.stdout.on('data',function(data) {
        const json_data = JSON.parse(data.toString())
        res.json({sentence:json_data})})
    }   
    catch(error){
        console.error(error);
        next(error);
    }
  }
)

// VAD 점수 반환
// (GET) /word/detail/w='selected word'&s1='synonym1'&s2='synonym2'&s3='synonym3'&s4='synonym4'
router.get('/detail',async(req,res,next)=>{
    try{
    const word = req.query.w;
        
    const s1 = req.query.s1;
    const s2 = req.query.s2;
    const s3 = req.query.s3;
    const s4 = req.query.s4;

    synonyms = []
    synonyms.push(s1);
    synonyms.push(s2);
    synonyms.push(s3);
    synonyms.push(s4);

    var scores = []
    const selected_word = await Vocabulary.findOne({
        where:{Vocab:word},
        attributes:['Vocab','V_score','A_score','D_score']
    })
    for (w of synonyms){
        const vad = await Vocabulary.findOne({
            where:{Vocab:w},
            attributes:['Vocab','V_score','A_score','D_score']
        })
        scores.push(vad)
    }

    const results = spawn('python',['gpt_ex.py',word,s1,s2,s3,s4])
    results.stdout.on('data',function(data) {
    const json_data = JSON.parse(data.toString())
    res.json({selected_word : selected_word, scores:scores, nuance:json_data})
    })
    } catch(err){
        console.error(err)
    }
})

// router.get('/vad',async(req,res,next)=>{
//     try{
//         const word = req.query.w;
        
//         const s1 = req.query.s1;
//         const s2 = req.query.s2;
//         const s3 = req.query.s3;
//         const s4 = req.query.s4;

//         synonyms = []
//         synonyms.push(s1);
//         synonyms.push(s2);
//         synonyms.push(s3);
//         synonyms.push(s4);

//         var scores = []
//         const selected_word = await Vocabulary.findOne({
//             where:{Vocab:word},
//             attributes:['Vocab','V_score','A_score','D_score']
//         })
//         for (w of synonyms){
//             const vad = await Vocabulary.findOne({
//                 where:{Vocab:w},
//                 attributes:['Vocab','V_score','A_score','D_score']
//             })
//             scores.push(vad)
//         }
        
//         res.json({selected_word:selected_word,synonyms:scores})
     
//     }
//     catch(err){console.error(err)}
// })



router.get('/detail',async(req,res,next)=>{
    try{
        const word = req.query.w;
        synonyms = []
        synonyms.push(req.query.s1);
        synonyms.push(req.query.s2);
        synonyms.push(req.query.s3);
        synonyms.push(req.query.s4);
        
        scores = []
        const selected_word = await Vocabulary.findOne({
            where:{Vocab:word},
            attributes:['Vocab','V_score','A_score','D_score']
        })
        for (w of synonyms){
            const vad = await Vocabulary.findOne({
                where:{Vocab:w},
                attributes:['Vocab','V_score','A_score','D_score']
            })
            scores.push(vad)
        }
        res.json({selected_word:selected_word,synonyms:scores})
    }
    catch(err){console.error(err)}
})
module.exports = router;