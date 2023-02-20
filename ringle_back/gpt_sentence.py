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


# Stage 2
prompt = 'Generate a common example sentence using the following word.'
text = prompt + '\n' + sys.argv[1]

print(json.dumps(gpt_3(text)))
