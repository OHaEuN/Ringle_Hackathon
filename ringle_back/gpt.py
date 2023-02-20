# !/usr/bin/env python
# coding: utf-8

import os
import sys
import json

import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("API_KEY")

def gpt_3(text):
  response = openai.Completion.create(
    model="text-davinci-003",
    prompt= text,
    temperature=0.3, # diversity
    max_tokens=100,
    top_p=1, # 0.8 ~ 1
    frequency_penalty=1,
    presence_penalty=1
  )
  return response['choices'][0]['text']


# Stage 1
prompt = 'Find important or frequently used words in a given sentence, and print out 4 words that are natural when replacing this word. \
        Output format: selected word, synonyms 1, synonyms 2, synonyms 3, synonyms 4 '

text = prompt + '\n' + sys.argv[1]
gpt_synonyms = gpt_3(text)
synonyms = gpt_synonyms.strip('\n').split(',')
input_for_examples = []
for i in synonyms:
    input_for_examples.append(i.strip(' '))

print(json.dumps(input_for_examples))

