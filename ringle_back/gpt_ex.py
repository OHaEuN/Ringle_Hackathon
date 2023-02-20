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

words = ''
for i in range(1,5):
        words += sys.argv[i] + ', '

words = words.rstrip(', ')


# Stage 2
prompt = 'Explain the nuance of the following five words. \n Output format: explanation1 (newline) explanation2 (new line) explanation3 (new line) explanation4 (new line) explanation5 (new line)' 
text = prompt + '\n' + words

gpt_examples = gpt_3(text)

print(json.dumps(gpt_examples))
