import torch
import numpy as np
from torchvision import transforms
from flask import Flask, jsonify, request

import argparse
import torch
from transformers import (
    RobertaTokenizer,
    RobertaConfig
)
from models import PretrainedLMModel
import torch.nn.functional as F


class ModelClass():
    def __init__(self, args):
        super(ModelClass, self).__init__()
        self.args = args
    def _set_model_args(self):
        model_name = 'roberta-base'

        return model_name


    def load_tokenizer(self):
        model_name = self._set_model_args()
        Tokenizer = RobertaTokenizer
        tokenizer = Tokenizer.from_pretrained(
            model_name)
        return tokenizer


    def load_model(self):
        model_name = self._set_model_args()

        config = RobertaConfig.from_pretrained(
                model_name)

        config.args = self.args
        model = PretrainedLMModel(config, model_name)

        return model, config


    def load_model_from_ckeckpoint(self, model, save_path):
        # 1. set path and load states
        print("\n Loading Model from:", save_path, "\n")
        device = torch.device('cpu')

        model.load_state_dict(torch.load(save_path, map_location=device)['state_dict'])

        return model
    
    def postprocess(self, predictions):
        result = str(predictions[0].tolist()[0])
        for i in predictions[0].tolist()[1:]:
            result = result + ', ' + str(i)
        return result
    
    def predict(self, tokenizer, model, data):
        model.eval()
        total_predictions = []

        with torch.no_grad():
            tokenized_data = tokenizer(data)
            
            # compute logits
            input_ids = torch.Tensor(np.array([tokenized_data['input_ids']])).to(torch.int64)
            attention_masks = torch.Tensor(np.array([tokenized_data['attention_mask']])).to(torch.int64)

            lm_logits, cls_logits = model(
                input_ids,
                attention_mask=attention_masks)

            #  model predictions
            predictions = F.relu(cls_logits) # vads

            #total_predictions.append(predictions)
            total_predictions = predictions

        #total_predictions = torch.cat(total_predictions, 0)
        return total_predictions

    def execute(self, dataset):
        tokenizer = self.load_tokenizer()
        
        model, config = self.load_model()
        
        model = self.load_model_from_ckeckpoint(
            model, self.args.save_path)
        
        results = []
        
        for data in dataset:
            predictions = self.predict(tokenizer, model, data)
            results.append(self.postprocess(predictions))

        return results

args = {
    "save_path" : "model_ckpt/emobank-vad-regression-693-11.ckpt",
    "task": "vad-regression",
    "load_ckeckpoint": False,

    "model": "roberta", 
    "load_pretrained_lm_weights": True,
    "dataset": "emobank", 
    "load_model": "pretrained_lm", 
    "use_emd": True, 

    "log_updates": False
    }

args = argparse.Namespace(**args)
model = ModelClass(args)

app = Flask(__name__)
@app.route('/inference', methods=['POST'])
def inference():
    dataset = request.json

    dataset = dataset['text']

    results = model.execute(dataset)

    return results

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=2431, threaded=False)

