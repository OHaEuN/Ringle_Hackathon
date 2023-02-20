const express = require('express');
const router = express.Router();
const { Vocabulary } = require('../models')

// 특정 동의어 클릭
// (GET) /data?word='word'&sentece='sentence'&synonym='synonym'
router.get('',async(req, res, next)=>{
    try{
        var word = req.query.word;
        var sentence = req.query.sentence;
        var synonym = req.query.synonym;
        result = {}
        // 단어 VAD score 차이 구하기 
        var vad_word = {}
        const word_data = await Vocabulary.findOne({
            where:{Vocab:word},
            attributes:['V_score','A_score','D_score','Desc']
        })

        const syn_data = await Vocabulary.findOne({
            where:{Vocab:synonym},
            attributes:['V_score','A_score','D_score']
        })
        vad_word.valence = word_data["V_score"] - syn_data["V_score"]
        vad_word.arousal = word_data["A_score"] - syn_data["A_score"]
        vad_word.dominance = word_data["D_score"] - syn_data["D_score"]

        result.vad_word = vad_word
        // Description - 어감 한글 풀이 설명
        result.description = word_data["Desc"]
        res.json({data:result})
    } catch(error){
        console.error(error);
        next(error);
    }
})


module.exports = router;